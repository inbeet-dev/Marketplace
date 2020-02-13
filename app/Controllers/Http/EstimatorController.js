'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')
const User = use('App/Models/User')
const LumberList = use('App/Models/LumberList')
const { validate } = use('Validator')
const Mail = use('Mail')
const Env = use('Env')

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

  async cancelLumberList({ auth, response, request }) {
    await authenticate.estimator(response, auth)

    const rule = {
      lumberListId: 'required'
    }

    const validation = await validate(request.all(), rule)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const user = await auth.getUser()

    const lumberList = await LumberList.findBy({
      id: request.input('lumberListId'),
      estimator_id: user.id
    })

    if (!lumberList) throw new ServerException('Lumber list not found', 404)

    lumberList.status = LumberList.STATUS.CANCELLED

    await lumberList.save()

    const estimatorAdmins = (
      await User.query()
        .where('role', User.ROLES.estimatorAdmin)
        .fetch()
    ).toJSON()

    for (const estimatorAdmin of estimatorAdmins) {
      await Mail.send('emails.lumber-list.cancelled', {}, (message) => {
        message
          .to(estimatorAdmin.email)
          .from(Env.get('MAIL_FROM'), 'Lumber Click')
          .subject('Lumber List Cancelled')
      })
    }

    return {
      success: true
    }
  }
}

module.exports = EstimatorController
