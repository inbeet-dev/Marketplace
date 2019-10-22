'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProjectsSchema extends Schema {
  up() {
    this.alter('projects', (table) => {
      table.text('address')
      table.integer('zip_code')
    })
  }

  down() {
    this.table('projects', (table) => {
      table.dropColumn('address')
      table.dropColumn('zip_code')
    })
  }
}

module.exports = AlterProjectsSchema
