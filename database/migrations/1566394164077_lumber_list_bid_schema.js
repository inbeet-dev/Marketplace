'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LumberListBidSchema extends Schema {
  up() {
    this.create('lumber_list_bids', (table) => {
      table.increments()
      table
        .integer('supplier_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('shipping_cost').unsigned()
      table.integer('tax').unsigned()
      table.string('status', 128)
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('lumber_list_bids')
  }
}

module.exports = LumberListBidSchema
