'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')
const Database = use('Database')
const { validate } = use('Validator')
const { save } = use('App/Utils/dbFunctions')


class SupplierController {
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

    const meta = { phoneNumber: phoneNumber, lat, long, accountType }

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
