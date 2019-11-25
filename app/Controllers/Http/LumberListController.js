'use strict'

const LumberListItem = use('App/Models/LumberListItem')
const { save } = use('App/Utils/dbFunctions')
const { validate } = use('Validator')
const LumberList = use('App/Models/LumberList')
const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const ServerException = use('App/Exceptions/ServerException')

class LumberListController {
  async addItems({ request, response, auth }) {
    await authenticate.estimator(response, auth)

    const rules = {
      items: 'required',
      lumberListId: 'required'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { items, lumberListId } = request.all()

    const lumberList = await LumberList.find(lumberListId)
    if (!lumberList) throw new ServerException('Lumber List not found', 404)

    const user = await auth.getUser()

    lumberList.estimator_id = user.id
    lumberList.status = LumberList.STATUS.awaitingForAdmin
    await save(lumberList, response)

    for (let i = 0; i < items.length; i++) {
      const lumberListItem = new LumberListItem()
      lumberListItem.lumber_list_id = lumberListId
      lumberListItem.type = items[i].type
      lumberListItem.meta = items[i].meta
      await save(lumberListItem, response)
    }

    return {
      success: true
    }
  }

  async editItems({ request, response, auth }) {
    await authenticate.estimator(response, auth)

    const { projectId, items } = request.all()

    const lumberList = await LumberList.findBy('project_id', projectId)

    if (!lumberList)
      throw new ServerException('lumber list of project not found')

    await LumberListItem.query()
      .where('lumber_list_id', lumberList.id)
      .delete()

    for (let i = 0; i < items.length; i++) {
      const item = new LumberListItem()
      item.type = items[i].type
      item.meta = items[i].meta
      item.lumber_list_id = lumberList.id
      await save(item, response)
    }

    return {
      success: true
    }
  }
}

module.exports = LumberListController
