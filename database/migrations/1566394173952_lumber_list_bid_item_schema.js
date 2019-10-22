'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LumberListBidItemSchema extends Schema {
  up() {
    this.create('lumber_list_bid_items', (table) => {
      table.increments()
      table.integer('amount')
      table
        .integer('lumber_list_bid_id')
        .unsigned()
        .references('id')
        .inTable('lumber_list_bids')
      table
        .integer('lumber_list_item_id')
        .unsigned()
        .references('id')
        .inTable('lumber_list_items')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('lumber_list_bid_items')
  }
}

module.exports = LumberListBidItemSchema
