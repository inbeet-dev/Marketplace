'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const LumberList = use('App/Models/LumberList')

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

  async lumberList({ response, auth, params }) {
    await authenticate.estimator(response, auth)

    const user = await auth.getUser()

    const lumberList = await LumberList.query()
      .where({ project_id: params.projectId, estimator_id: user.id })
      .with('items')
      .first()

    return lumberList
  }

  async lumberListAdminApproval({ request, response, auth }) {
    await authenticate.estimator(response, auth)

    const user = await auth.getUser()

    const lumberList = await LumberList.query()
      .where({
        estimator_id: user.id,
        id: request.input('lumberListId')
      })
      .fetch()

    if (!lumberList) throw new ServerException('Lumber list not found', 404)

    if (lumberList.status !== LumberList.STATUS.open)
      throw new ServerException('User has no access', 403)

    lumberList.status = LumberList.STATUS.awaitingAdminApproval

    await lumberList.save()

    return {
      success: true
    }
  }
}

module.exports = EstimatorController
