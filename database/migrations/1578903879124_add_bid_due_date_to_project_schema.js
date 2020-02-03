'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddBidDueDateToProjectSchema extends Schema {
  up() {
    this.alter('projects', (table) => {
      table.dateTime('bid_due_date')
    })
  }

  down() {
    this.alter('projects', (table) => {
      table.dropColumn('bid_due_date')
    })
  }
}

module.exports = AddBidDueDateToProjectSchema
