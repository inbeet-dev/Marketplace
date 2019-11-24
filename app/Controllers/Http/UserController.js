'use strict'

const { save } = use('App/Utils/dbFunctions')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.all()

    const rules = {
      email: 'required|email',
      password: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { token, refreshToken } = await auth
      .withRefreshToken()
      .attempt(email, password)

    const user = await User.findBy('email', email)

    return {
      success: true,
      data: {
        role: user.role,
        token,
        refreshToken
      }
    }
  }

  async register({ request, response, auth }) {
    const { name, email, password, phoneNumber } = request.all()

    const rules = {
      email: 'required|email',
      name: 'required',
      password: 'required',
      phoneNumber: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const findUser = await User.findBy('email', email)
    if (findUser) throw new ServerException('Email exists', 403)

    const meta = { phoneNumber }

    const user = new User()

    user.name = name
    user.email = email
    user.password = password
    user.role = User.ROLES.customer
    user.meta = meta

    await save(user, response)

    const { token, refreshToken } = await auth
      .withRefreshToken()
      .attempt(email, password)

    return {
      success: true,
      token,
      refreshToken
    }
  }

  async dashboard({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const user = await auth.getUser()

    await user.load('projects')

    return {
      success: true,
      data: {
        user
      }
    }
  }

  async getUser({ response, auth }) {
    await authenticate.allUser(response, auth)

    return {
      success: true
    }
  }
}

module.exports = UserController
