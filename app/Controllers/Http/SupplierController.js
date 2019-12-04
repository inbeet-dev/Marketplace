'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()

class SupplierController {
  async dashboard({ request, response, auth }) {
    await authenticate.supplier(response, auth)

    return {
      success: true
    }
  }
}

module.exports = SupplierController
