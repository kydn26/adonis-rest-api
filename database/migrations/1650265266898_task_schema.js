"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table.increments();
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects");
      table.string("description", 1000).notNullable();
      table.boolean("isCompleted").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TaskSchema;
