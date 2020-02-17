'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDiscountAndTotalToLumberListBidsSchema extends Schema {
  up() {
    this.alter('lumber_list_bids', (table) => {
      table.integer('discount').unsigned()
      table.float('total', 2).unsigned()
    })
  }

  down() {
    this.alter('lumber_list_bids', (table) => {
      table.dropColumn('discount')
      table.dropColumn('total')
    })
  }
}

module.exports = AddDiscountAndTotalToLumberListBidsSchema
