'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const Database = use('Database')
const Project = use('App/Models/Project')

class SupplierController {
  async dashboard({ request, response, auth }) {
    await authenticate.supplier(response, auth)

    const supplier = await auth.getUser()

    const { rows: projects } = await Database.raw(
      `SELECT * FROM projects LEFT JOIN
      (SELECT project_id AS id FROM lumber_lists LEFT JOIN
      (SELECT lumber_list_id AS id FROM
      (SELECT lumber_list_item_id AS id FROM 
      lumber_list_bids LEFT JOIN lumber_list_bid_items 
      ON lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
      WHERE lumber_list_bids.supplier_id = ?) AS lumber_list_item
      RIGHT JOIN lumber_list_items 
      ON lumber_list_item.id = lumber_list_items.id) AS lumber_list
      ON lumber_list.id = lumber_lists.id) AS project
      ON project.id = projects.id WHERE projects.status = ?`,
      [supplier.id, Project.STATUS.open]
    )

    return {
      success: true,
      data: {
        projects
      }
    }
  }
}

module.exports = SupplierController
