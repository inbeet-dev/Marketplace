'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEstimatedPriceToLumberListSchema extends Schema {
  up() {
    this.alter('lumber_lists', (table) => {
      table.integer('estimated_price').unsigned()
    })
  }

  down() {
    this.alter('lumber_lists', (table) => {
      table.dropColumn('estimated_price')
    })
  }
}

module.exports = AddEstimatedPriceToLumberListSchema
