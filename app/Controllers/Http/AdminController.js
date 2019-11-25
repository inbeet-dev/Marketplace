'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()

class AdminController {
  async addEmployee({ request, response, auth }) {
    await authenticate.admin(response, auth)

    return {
      success: true
    }
  }
}

module.exports = AdminController
