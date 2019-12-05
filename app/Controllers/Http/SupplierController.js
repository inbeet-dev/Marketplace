'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const { save } = use('App/Utils/dbFunctions')

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
      throw new ServerException('Role is invalid', 400)

    const supplier = await User.find(supplierId)
    if (!supplier) throw new ServerException('Supplier not found', 404)

    supplier.status = status
    await save(supplier, response)

    return {
      success: true
    }
  }
}

module.exports = SupplierController
