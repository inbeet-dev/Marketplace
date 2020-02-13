'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const LumberList = use('App/Models/LumberList')
const Project = use('App/Models/Project')
const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')
const ServerException = use('App/Exceptions/ServerException')
const moment = require('moment')
const { save } = use('App/Utils/dbFunctions')

class EstimatorAdminController {
  async lumberLists({ response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberListsData = (
      await LumberList.query()
        .where('status', LumberList.STATUS.AWAITING_MANAGER_APPROVAL)
        .with('project', (builder) => {
          builder.with('customer')
        })
        .with('items')
        .fetch()
    ).toJSON()

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

  async lumberList({ request, response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberList = (
      await Project.query()
        .where('id', request.params.id)
        .with('lumberlists', (builder) => {
          builder.whereNot('status', LumberList.STATUS.CANCELLED)
          builder.with('items')
        })
        .first()
    ).toJSON()

    return {
      id: lumberList.id,
      items: lumberList.items
    }
  }

  async lumberListApprove({ request, response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const lumberList = await LumberList.findOrFail(
      request.input('lumberListId')
    )

    lumberList.status = LumberList.STATUS.COMPLETED
    await lumberList.save()

    const project = await lumberList.project().first()
    project.status = Project.STATUS.LUMBER_LIST_COMPLETED

    await project.save()

    const estimatorEmail = (await lumberList.estimator().first()).email

    await Mail.send('emails.lumber-list.approved', {}, (message) => {
      message
        .to(estimatorEmail)
        .from(Env.get('MAIL_FROM'), 'Lumber Click')
        .subject('Lumber List Approved')
    })

    const customerEmail = (
      await (await lumberList.project().first()).customer().first()
    ).email

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

    lumberList.status = LumberList.STATUS.OPEN
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

  async projects({ response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const projectsData = (
      await Project.query()
        .with('customer')
        .with('lumberLists', (builder) =>
          builder.whereNot('status', LumberList.STATUS.CANCELLED)
        )
        .fetch()
    ).toJSON()

    const projects = []

    for (const project of projectsData) {
      projects.push({
        user: {
          name: project.customer.name
        },
        project: {
          id: project.id,
          address: project.address,
          dueDate: project.due_date,
          status: project.status
        },
        estimatorId: project.lumberLists[0].estimator_id || null
      })
    }

    return projects
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

  async files({ request }) {
    const { projectsId } = request.all()

    const files = []

    for (const id of projectsId) {
      const projectFiles = await (await Project.find(id)).files()
      if (projectFiles) {
        for (const file of projectFiles) {
          files.push(file)
        }
      }
    }

    return files
  }

  async estimators({ response, auth }) {
    await authenticate.estimatorAdmin(response, auth)

    const estiamtors = await User.query()
      .where('role', User.ROLES.estimator)
      .fetch()

    return estiamtors
  }
}

module.exports = EstimatorAdminController
