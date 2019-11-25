'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')

class AdminController {
  async getEmployees({ response, auth }) {
    await authenticate.admin(response, auth)

    const admin = await auth.getUser()

    const employees = await User.query()
      .where('id', '!=', admin.id)
      .fetch()

    return {
      success: true,
      data: {
        employees
      }
    }
  }
}

module.exports = AdminController
