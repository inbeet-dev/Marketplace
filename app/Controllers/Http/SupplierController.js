'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { save } = use('App/Utils/dbFunctions')
const ServerException = use('App/Exceptions/ServerException')
const { validate } = use('Validator')
const User = use('App/models/User')

class SupplierController {
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
