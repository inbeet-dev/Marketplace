'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()

class SupplierController {
  async changeStatus({ response, request, auth }) {
    await authenticate.admin(response, auth)
    return {
      success: true
    }
  }
}

module.exports = SupplierController
