'use strict'

const { save } = use('App/Utils/dbFunctions')
const { notifyConfig } = use('App/Utils/constVar')
const Project = use('App/Models/Project')
const Helpers = use('Helpers')
const ProjectFile = use('App/Models/ProjectFile')
const { validate } = use('Validator')
const LumberList = use('App/Models/LumberList')
const Knex = require('knex')
const KnexPostgis = require('knex-postgis')
const Database = use('Database')
const Notification = use('App/Utils/notifyValidation')
const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ProjectSupplier = use('App/Models/ProjectSupplier')
const ServerException = use('App/Exceptions/ServerException')

class ProjectController {
  async register({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const db = Knex({
      dialect: 'postgres'
    })

    const st = KnexPostgis(db)

    const user = await auth.getUser()

    const { name, long, lat, zipCode, address } = request.all()

    const rules = {
      name: 'required',
      lat: 'required',
      long: 'required',
      zipCode: 'required',
      address: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const projectId = await Database.insert({
      name,
      zip_code: zipCode,
      address,
      status: Project.STATUS.open,
      user_id: user.id,
      notify_config: notifyConfig.everyBid,
      due_date: new Date(Date.now() + 7 * 24 * 3600000).toUTCString(),
      location: st.geomFromText('Point(' + lat + ' ' + long + ')', 4326)
    })
      .into('projects')
      .returning('id')

    const query = await Database.raw(`SELECT location, res2.* FROM (SELECT res1.* , concat('SRID=4326;POINT(',lat,' ',long,')') AS location FROM (SELECT *, meta::json->>'lat' AS lat, meta::json->>'long' AS long FROM users WHERE users.role='supplier') AS res1) AS res2 WHERE
    ST_Distance(location::geometry,'SRID=4326;POINT(${lat} ${long})'::geometry) < 5`)

    const suppliers = query.rows

    const lumberList = new LumberList()
    lumberList.project_id = projectId[0]
    lumberList.status = LumberList.STATUS.inReview

    const estimators = await Database.raw(
      `SELECT id, name, estimator_id, COUNT(estimator_id) AS num FROM (SELECT users.id, users.name, users.role, lumber_lists.estimator_id, lumber_lists.created_at FROM users LEFT JOIN lumber_lists ON users.id = lumber_lists.estimator_id WHERE users.role='estimator' AND (lumber_lists.status = 'In Review' OR lumber_lists.status IS NULL) ORDER BY lumber_lists.updated_at) AS tb GROUP BY estimator_id, name, id ORDER BY num`
    )

    const estimatorId = estimators.rows.length ? estimators.rows[0].id : null
    lumberList.estimator_id = estimatorId

    await save(lumberList, response)

    for (let i = 0; i < suppliers.length; i++) {
      const projectSupplier = new ProjectSupplier()
      projectSupplier.project_id = projectId[0]
      projectSupplier.supplier_id = suppliers[i].id
      await save(projectSupplier, response)
    }

    return {
      success: true,
      data: {
        projectId: projectId[0]
      }
    }
  }

  async upload({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const user = await auth.getUser()
    const files = request.file('files')

    const rules = {
      projectId: 'required',
      type: 'required',
      files: 'required'
    }

    const fieldObj = request.all()
    fieldObj.files = files

    const validation = await validate(fieldObj, rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { projectId, type } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    if (project.user_id !== user.id)
      throw new ServerException('User has no access', 403)

    await files.moveAll(Helpers.publicPath('uploads/projectFiles'), (file) => {
      const name = `${new Date().getTime()}-${Math.round(
        Math.random() * 1000
      )}-${file._clientName}`

      return {
        name
      }
    })

    for (let i = 0, file; (file = files.movedList()[i]); i++) {
      const projectFile = new ProjectFile()
      projectFile.project_id = projectId
      projectFile.path = `/uploads/projectFiles/${file.fileName}`
      projectFile.type = type

      await projectFile.save()
    }

    return {
      success: true
    }
  }

  async close({ request, response, auth, params }) {
    await authenticate.allUser(response, auth)

    const { closeReason, projectId } = request.all()

    const rules = {
      closeReason: 'required',
      projectId: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    project.closed_at = new Date()
    project.close_reason = closeReason

    await save(project, response)

    return {
      success: true
    }
  }

  async getProject({ params, response, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)

    return {
      success: true,
      data: project
    }
  }

  async plans({ response, params, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)

    const projectFiles = await project.files().fetch()

    return {
      success: true,
      data: projectFiles
    }
  }

  async getList({ response, params, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)

    const lists = await project.lists().fetch()

    return {
      success: true,
      data: lists
    }
  }

  async changeNotification({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const rules = {
      projectId: 'required',
      notifyConfig: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { projectId, notifyConfig } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    const notification = new Notification()
    if (!notification.validator(notifyConfig))
      throw new ServerException('Invalid Notify Config', 400)

    project.notify_config = notifyConfig
    await save(project, response)

    return {
      success: true
    }
  }

  async cancelProject({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const rules = {
      projectId: 'required',
      closeReason: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { projectId, closeReason } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    project.status = Project.STATUS.canceled
    project.close_reason = closeReason
    project.closed_at = new Date()
    await save(project, response)

    return {
      success: true
    }
  }

  async onHoldProject({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const rules = { projectId: 'required' }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { projectId } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    project.status = Project.STATUS.onHold
    project.on_hold_at = new Date()
    await save(project, response)

    return {
      success: true
    }
  }

  async getProjectBid({ response, params, auth }) {
    await authenticate.allUser(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)

    await project.load('lists.items.bidItems')

    return {
      success: true,
      data: {
        project
      }
    }
  }

  async despoit({ request, response, auth }) {
    await authenticate.allUser(response, auth)

    const rules = {
      projectId: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { projectId } = request.all()

    const project = await Project.find(projectId)
    if (!project) throw new ServerException('Project not found', 404)

    project.status = Project.STATUS.complete
    await save(project, response)

    return {
      success: true
    }
  }

  async getSuppliers({ params, response, auth }) {
    await authenticate.customerSupport(response, auth)

    const id = params.id

    const project = await Project.find(id)
    if (!project) throw new ServerException('Project not found', 404)
    await project.load('suppliers')

    return {
      success: true,
      data: {
        project
      }
    }
  }
}

module.exports = ProjectController
