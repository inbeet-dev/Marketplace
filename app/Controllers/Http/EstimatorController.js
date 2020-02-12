'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const LumberList = use('App/Models/LumberList')
const Project = use('App/Models/Project')

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

    const lumberList = await LumberList.query()
      .where('project_id', params.projectId)
      .with('items')
      .first()

    return lumberList
  }

  async lumberListAdminApproval({ request, response, auth }) {
    await authenticate.estimator(response, auth)

    const lumberList = await LumberList.findOrFail(
      request.input('lumberListId')
    )

    if (lumberList.status !== LumberList.STATUS.open)
      throw new ServerException('User has no access', 403)

    lumberList.status = LumberList.STATUS.awaitingAdminApproval

    await lumberList.save()

    return {
      success: true
    }
  }

  async getProjects({ response, auth }) {
    await authenticate.estimator(response, auth)

    const projects = await Project.query().orderBy('created_at', 'desc')

    return projects
  }
}

module.exports = EstimatorController
