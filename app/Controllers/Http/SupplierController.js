'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')

class SupplierController {
  async changeStatus({ response, request, auth }) {
    await authenticate.admin(response, auth)

    const validation = await validate(request.all(), {
      supplierId: 'required',
      status: 'required'
    })

    const { status } = request.all()

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    if (
      ![
        User.STATUS.active,
        User.STATUS.deActive,
        User.STATUS.terminated,
        User.STATUS.inReview
      ].includes(status)
    )
      throw new ServerException('Role is invalid', 400)

    return {
      success: true
    }
  }
}

module.exports = SupplierController
