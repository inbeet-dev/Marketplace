'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')

class EstimatorController {
  async dashboard({ response, auth }) {
    await authenticate.estimator(response, auth)

    const user = await auth.getUser()

    if (user.role !== User.ROLES.estimator)
      throw new ServerException('User has no access', 403)

    const estimates = await user.estimates().fetch()
    const projects = await user.estimatedProject().fetch()

    return {
      success: true,
      data: {
        user,
        estimates,
        projects
      }
    }
  }
}

module.exports = EstimatorController
