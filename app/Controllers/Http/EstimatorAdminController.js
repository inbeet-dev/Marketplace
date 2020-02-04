'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const LumberList = use('App/Models/LumberList')
const Project = use('App/Models/Project')
const Mail = use('Mail')
const Env = use('Env')

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
}

module.exports = EstimatorAdminController
