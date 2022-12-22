/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("stock_id").unsigned().references("id").inTable("stocks");
    table.string("type").notNullable();
    table.integer("number_of_stocks").notNullable();
    table.float("price").notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
