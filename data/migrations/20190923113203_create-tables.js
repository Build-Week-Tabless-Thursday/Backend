exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      // ID
      tbl.increments();

      // USERNAME
      tbl
        .string('username', 255)
        .unique()
        .notNullable();

      // EMAIL
      tbl
        .string('email', 255)
        .unique()
        .notNullable();

      // PASSWORD
      tbl.string('password', 255).notNullable();
    })
    .createTable('tabs', tbl => {
      // ID
      tbl.increments();

      // URL
      tbl.string('url', 255).notNullable();

      // TITLE
      tbl.string('title', 255).notNullable();

      //DUE DATE
      tbl.date('due');

      // CATEGORY
      tbl.string('category', 255);

      // PREVIEW
      tbl.text('preview', 'longtext');

      // COLORs
      tbl.string('backgroundColor', 255);
      tbl.string('color', 255);

      // NOTES
      tbl.text('notes');

      // FOREIGN KEY TO USERS
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tabs').dropTableIfExists('users');
};
