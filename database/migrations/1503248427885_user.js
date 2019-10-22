'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 64).notNullable()
      table
        .string('email', 128)
        .notNullable()
        .unique()
      table.string('password', 128).notNullable()
      table.string('role', 64)
      table.jsonb('meta').defaultTo('{}')
      table.timestamps(false, true)
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
