'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const LumberList = use('App/Models/LumberList')
const Project = use('App/Models/Project')
const Mail = use('Mail')
const Env = use('Env')
const ServerException = use('App/Exceptions/ServerException')
const moment = require('moment')
const { save } = use('App/Utils/dbFunctions')

class EstimatorAdminController {
  async lumberLists({ response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberListsData = (await LumberList.query()
      .where('status', LumberList.STATUS.awaitingAdminApproval)
      .with('project', (builder) => {
        builder.with('customer')
      })
      .with('items')
      .fetch()).toJSON()

    const lumberLists = []

    for (const lumberlist of lumberListsData) {
      lumberLists.push({
        id: lumberlist.id,
        userName: lumberlist.project.customer.name,
        projectName: lumberlist.project.name,
        items: lumberlist.items
      })
    }

    return lumberLists
  }

  async lumberListApprove({ request, response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberList = await LumberList.findOrFail(
      request.input('lumberListId')
    )

    lumberList.status = LumberList.STATUS.complete
    await lumberList.save()

    const project = await lumberList.project().first()
    project.status = Project.STATUS.lumberListCompleted

    await project.save()

    const estimatorEmail = (await lumberList.estimator().first()).email

    await Mail.send('emails.lumber-list.approved', {}, (message) => {
      message
        .to(estimatorEmail)
        .from(Env.get('MAIL_FROM'), 'Lumber Click')
        .subject('Lumber List Approved')
    })

    const customerEmail = (await (await lumberList.project().first())
      .customer()
      .first()).email

    await Mail.send('emails.lumber-list.finished', {}, (message) => {
      message
        .to(customerEmail)
        .from(Env.get('MAIL_FROM'), 'Lumber Click')
        .subject('Lumber List Finished')
    })

    return {
      success: true
    }
  }

  async lumberListReject({ request, response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberList = await LumberList.findOrFail(
      request.input('lumberListId')
    )

    lumberList.status = LumberList.STATUS.open
    await lumberList.save()

    const email = (await lumberList.estimator().first()).email

    await Mail.send('emails.lumber-list.rejected', {}, (message) => {
      message
        .to(email)
        .from(Env.get('MAIL_FROM'), 'Lumber Click')
        .subject('Lumber List Rejected')
    })

    return {
      success: true
    }
  }

  async setDueDate({ request, response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const { projectId, dueDate } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    if (!moment(dueDate).isValid())
      throw new ServerException('DueDate is not Date')

    const difference = moment(dueDate).diff(moment(project.created_at))

    if (difference < 0)
      throw new ServerException('Project is created after due date', 403)

    project.due_date = moment(dueDate)
    await save(project, response)

    return {
      success: true
    }
  }
}

module.exports = EstimatorAdminController
