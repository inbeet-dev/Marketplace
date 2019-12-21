'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const { save } = use('App/Utils/dbFunctions')
const Database = use('Database')
const Project = use('App/Models/Project')

class SupplierController {
  async changeStatus({ response, request, auth }) {
    await authenticate.admin(response, auth)

    const validation = await validate(request.all(), {
      supplierId: 'required',
      status: 'required'
    })

    const { status, supplierId } = request.all()

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    if (
      ![
        User.STATUS.active,
        User.STATUS.deActive,
        User.STATUS.terminated,
        User.STATUS.inReview,
        User.STATUS.paused,
        User.STATUS.removed,
        User.STATUS.cancelled
      ].includes(status)
    )
      throw new ServerException('Status is invalid', 400)

    const supplier = await User.find(supplierId)
    if (!supplier) throw new ServerException('Supplier not found', 404)

    supplier.status = status
    await save(supplier, response)

    return {
      success: true
    }
  }

  async dashboard({ request, response, auth }) {
    await authenticate.supplier(response, auth)

    const supplier = await auth.getUser()

    const { rows: bidedProjects } = await Database.raw(
      `SELECT projects.* FROM lumber_list_bids
      INNER JOIN lumber_list_bid_items
      ON lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
      INNER JOIN lumber_list_items
      ON lumber_list_items.id = lumber_list_bid_items.lumber_list_item_id
      INNER JOIN lumber_lists
      ON lumber_list_items.lumber_list_id = lumber_lists.id
      INNER JOIN projects
      ON projects.id = lumber_lists.project_id
      WHERE supplier_id = ? AND projects.status != ?`,
      [supplier.id, Project.STATUS.open]
    )

    const { rows: notBiddedProjects } = await Database.raw(
      `SELECT projects.* FROM lumber_list_bids
      INNER JOIN lumber_list_bid_items
      ON lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
      INNER JOIN lumber_list_items
      ON lumber_list_items.id = lumber_list_bid_items.lumber_list_item_id
      INNER JOIN lumber_lists
      ON lumber_list_items.lumber_list_id = lumber_lists.id
      INNER JOIN projects
      ON projects.id = lumber_lists.project_id
      WHERE supplier_id != 8 AND projects.status = 'Lumber List open'`
    )

    return {
      success: true,
      data: {
        bidedProjects,
        notBiddedProjects
      }
    }
  }

  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const inReviewOrActvieSupplier = await Database.from('users')
      .where('role', User.ROLES.supplier)
      .whereIn('status', [User.STATUS.active, User.STATUS.inReview])

    const cancelledOrPausedSupplier = await Database.from('users')
      .where('role', User.ROLES.supplier)
      .whereIn('status', [User.STATUS.cancelled, User.STATUS.paused])

    return {
      success: true,
      data: {
        suppliers: {
          inReviewOrActive: inReviewOrActvieSupplier,
          cancelledOrPaused: cancelledOrPausedSupplier
        }
      }
    }
  }

  async register({ request, response, auth }) {
    const {
      name,
      email,
      password,
      phoneNumber,
      lat,
      long,
      accountType
    } = request.all()

    const rules = {
      email: 'required|email',
      name: 'required',
      password: 'required',
      phoneNumber: 'required',
      lat: 'required',
      long: 'required',
      accountType: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    if (
      ![User.ACCOUNT_TYPES.company, User.ACCOUNT_TYPES.individual].includes(
        accountType
      )
    )
      throw new ServerException('Invalid role', 400)

    const meta = { phoneNumber, lat, long, accountType }

    const user = new User()

    user.name = name
    user.email = email
    user.password = password
    user.role = User.ROLES.supplier
    user.meta = meta

    await save(user, response)

    const { token } = await auth.attempt(email, password)

    return {
      success: true,
      data: {
        token,
        name,
        role: user.role
      }
    }
  }
}

module.exports = SupplierController
