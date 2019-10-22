'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddStatusToUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('status', 128).defaultTo('active')
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = AddStatusToUserSchema
