'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')

class AdminController {
  async addEmployee({ request, response, auth }) {
    await authenticate.admin(response, auth)

    const rules = {
      name: 'required',
      address: 'required',
      email: 'required|email',
      phone: 'required',
      password: 'required',
      role: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    return {
      success: true
    }
  }
}

module.exports = AdminController
