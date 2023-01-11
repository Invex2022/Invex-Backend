/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      email: "damian@gmail.com",
      password: "damian123",
      first_name: "damian",
      last_name: "damian",
      username: "damian",
      total_amount: 1000,
    },
  ]);
};
