const User = use('App/Models/User')
const ServerException = use('App/Exceptions/ServerException')

class Auth {
  async admin(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await auth.getUser()
    if (user.role !== User.ROLES.admin)
      throw new ServerException('User has no access', 403)
  }

  async allUser(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }
  }

  async supplier(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await auth.getUser()
    if (user.role !== User.ROLES.supplier)
      throw new ServerException('User has no access', 403)
  }

  async estimator(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await auth.getUser()
    if (user.role !== User.ROLES.estimator)
      throw new ServerException('User has no access', 403)
  }

  async estimatorAdmin(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await auth.getUser()
    if (user.role !== User.ROLES.estimatorAdmin)
      throw new ServerException('User has no access', 403)
  }

  async customerSupport(response, auth) {
    try {
      await auth.check()
    } catch (err) {
      response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await auth.getUser()
    if (user.role !== User.ROLES.supportCustomer)
      throw new ServerException('User has no access', 403)
  }
}

module.exports = Auth
