'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const Database = use('Database')
const Project = use('App/Models/Project')

class SupplierController {
  async dashboard({ request, response, auth }) {
    await authenticate.supplier(response, auth)

    const supplier = await auth.getUser()

    // const { rows: projects } = await Database.raw(
    //   `SELECT * FROM project Inner
    //   `)

    const { rows: bidedProjects } = await Database.raw(
      `SELECT projects.* FROM lumber_list_bids
      INNER JOIN lumber_list_bid_items
      ON lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
      INNER JOIN lumber_list_items
      ON lumber_list_items.id = lumber_list_bid_items.lumber_list_item_id
      INNER JOIN lumber_lists
      ON lumber_list_items.lumber_list_id = lumber_lists.id
      INNER JOIN projects
      ON projects.id = lumber_lists.project_id
      WHERE supplier_id = ? AND projects.status != ?`,
      [supplier.id, Project.STATUS.open]
    )

    return {
      success: true,
      data: {
        bidedProjects
      }
    }
  }
}

module.exports = SupplierController
