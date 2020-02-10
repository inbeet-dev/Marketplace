'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLumberListIdToLumberListBidSchema extends Schema {
  up() {
    this.alter('lumber_list_bids', (table) => {
      table
        .integer('lumber_list_id')
        .unsigned()
        .references('id')
        .inTable('lumber_lists')
    })
  }

  down() {
    this.alter('lumber_list_bids', (table) => {
      table.dropColumn('lumber_list_id')
    })
  }
}

module.exports = AddLumberListIdToLumberListBidSchema
