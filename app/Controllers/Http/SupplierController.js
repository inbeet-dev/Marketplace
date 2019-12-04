'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
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

    const { supplierId } = request.all()

    const supplier = await User.find(supplierId)
    if (!supplier) throw new ServerException('Supplier not found')

    return {
      success: true
    }
  }
}

module.exports = SupplierController
