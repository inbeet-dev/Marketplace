'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')

class SupplierController {
  async getSuppliers({ response, auth }) {
    await authenticate.admin(response, auth)

    const users = await User.query().where('role', 'supplier')

    return {
      success: true,
      data: {
        users
      }
    }
  }
}

module.exports = SupplierController
