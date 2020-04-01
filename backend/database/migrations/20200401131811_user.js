
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments();
        table.string('userId').notNullable();
        table.string('name').notNullable();
        table.string('ocupation').notNullable();
        table.string('userName').notNullable();
        table.string('userPass').notNullable();
       
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
