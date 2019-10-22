'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CastStatusOfLumberlistToTextSchema extends Schema {
  up() {
    this.alter('lumber_lists', (table) => {
      table.text('status').alter()
    })
  }

  down() {
    this.alter('lumber_lists', (table) => {
      table.integer('status').alter()
    })
  }
}

module.exports = CastStatusOfLumberlistToTextSchema
