'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const { save } = use('App/Utils/dbFunctions')

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

    const { name, address, email, phone, password, role } = request.all()

    const user = new User()

    if (
      ![
        User.ROLES.estimator,
        User.ROLES.supportCustomer,
        User.ROLES.admin
      ].includes(role)
    )
      throw new ServerException('Role is invalid', 400)

    user.name = name
    user.email = email
    user.password = password
    user.role = role
    user.meta = { address, phoneNumber: phone }

    await save(user, response)

    return {
      success: true
    }
  }
}

module.exports = AdminController
