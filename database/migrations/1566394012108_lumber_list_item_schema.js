'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LumberListItemSchema extends Schema {
  up() {
    this.create('lumber_list_items', (table) => {
      table.increments()
      table.string('type', 128)
      table
        .integer('lumber_list_id')
        .unsigned()
        .references('id')
        .inTable('lumber_lists')
      table.jsonb('meta').defaultTo('{}')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('lumber_list_items')
  }
}

module.exports = LumberListItemSchema
