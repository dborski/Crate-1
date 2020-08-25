// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/crate',
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeders'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/crate_test',
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeders'
    },
    useNullAsDefault: true
  },
};
