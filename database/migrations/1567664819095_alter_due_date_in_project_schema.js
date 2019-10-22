'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDueDateInProjectSchema extends Schema {
  up() {
    this.alter('projects', (table) => {
      table.dateTime('due_date')
    })
  }

  down() {
    this.alter('projects', (table) => {
      table.dropColumn('due_date')
    })
  }
}

module.exports = AlterDueDateInProjectSchema
