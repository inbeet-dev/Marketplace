'use strict'

const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const { save } = use('App/Utils/dbFunctions')
const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()

class SupplierController {
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
