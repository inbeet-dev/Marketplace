'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const { save } = use('App/Utils/dbFunctions')
const Database = use('Database')
const Project = use('App/Models/Project')
const LumberList = use('App/Models/LumberList')
const LumberListBid = use('App/Models/LumberListBid')
const LumberListBidItem = use('App/Models/LumberListBidItem')
const LumberListItem = use('App/Models/LumberListItem')

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

    const projectsAcceptingBidsData = (
      await supplier
        .projects()
        .with('lumberLists', (builder) => {
          builder.where('status', LumberList.STATUS.complete)
          builder.withCount('bids')
        })
        .fetch()
    ).toJSON()

    const closedOrWonProjectsData = (
      await supplier
        .projects()
        .whereNot('status', Project.STATUS.openForBids)
        .with('lumberLists')
        .fetch()
    ).toJSON()

    const projectsAcceptingBids = []
    for (const project of projectsAcceptingBidsData) {
      if (project.lumberLists.length !== 1)
        throw new ServerException('Incompatible lumberlist data')

      projectsAcceptingBids.push({
        address: project.address,
        dateCreated: project.created_at,
        estimatedPrice: project.lumberLists[0].estimated_price,
        location: project.location,
        bidsReceived: project.lumberLists[0].__meta__.bids_count,
        dateCloses: project.bid_due_date
      })
    }

    const closedOrWonProjects = []
    for (const project of closedOrWonProjectsData) {
      if (project.lumberLists.length !== 1)
        throw new ServerException('Incompatible lumberlist data')

      projectsAcceptingBids.push({
        address: project.address,
        dateCreated: project.created_at,
        estimatedPrice: project.lumberLists[0].estimated_price,
        location: project.location,
        status: project.status
      })
    }

    return { projectsAcceptingBids, closedOrWonProjects }
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

  async submitBid({ response, request, auth }) {
    await authenticate.supplier(response, auth)

    const rules = {
      shipping: 'required',
      tax: 'required',
      items: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { shipping, tax, items } = request.all()

    const user = await auth.getUser()

    const lumberListBid = new LumberListBid()

    lumberListBid.shipping_cost = shipping
    lumberListBid.tax = tax
    lumberListBid.supplier_id = user.id
    lumberListBid.status = LumberListBid.STATUS.open

    await save(lumberListBid, response)

    items.forEach(async (item) => {
      const lumberListItem = await LumberListItem.find(item.lumber_list_item_id)

      if (!lumberListItem)
        throw new ServerException('Lumber list item not found', 404)

      const lumberListBidItem = new LumberListBidItem()

      lumberListBidItem.amount = item.price
      lumberListBidItem.lumber_list_bid_id = lumberListBid.id
      lumberListBidItem.lumber_list_item_id = lumberListItem.id

      await save(lumberListBidItem, response)
    })

    return {
      success: true
    }
  }

  async getBidPage({ response, auth, params }) {
    // await authenticate.supplier(response, auth)

    const project = await Project.find(params.id)
    const lumberListItems = await project.lumberListItems().fetch()

    return {
      success: true,
      data: {
        lumberListItems
      }
    }
  }

  async editSupplier({ response, request, auth }) {
    await authenticate.admin(response, auth)

    const validation = await validate(request.all(), {
      email: 'email',
      supplierId: 'required'
    })
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const {
      name,
      address,
      email,
      phone: phoneNumber,
      supplierId
    } = request.all()

    const supplier = await User.find(supplierId)
    if (!supplier) throw new ServerException('Supplier not found')

    if (name) supplier.name = name
    if (address) supplier.meta = { ...supplier.meta, address }
    if (email) supplier.meta = { ...supplier.meta, email }
    if (phoneNumber) supplier.meta = { ...supplier.meta, phoneNumber }

    await save(supplier, response)

    return {
      success: true
    }
  }
}

module.exports = SupplierController
