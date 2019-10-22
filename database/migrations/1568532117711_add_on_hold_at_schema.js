'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddOnHoldAtSchema extends Schema {
  up() {
    this.alter('projects', (table) => {
      table.dateTime('on_hold_at')
    })
  }

  down() {
    this.alter('projects', (table) => {
      table.dropColumn('on_hold_at')
    })
  }
}

module.exports = AddOnHoldAtSchema
