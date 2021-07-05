const path = require('path');
// const envConfig = require('dotenv').config()

function env(key) {
  return process.env[key];
}

const baseConfig = {
  type: 'mongodb',
  database: env('TYPEORM_DATABASE'),
  entities: [path.resolve(__dirname, env('TYPEORM_ENTITIES'))],
  seeds: [path.resolve(__dirname, env('TYPEORM_SEEDS'))],
  factories: [path.resolve(__dirname, env('TYPEORM_FACTORIES'))],
  logging: ['warn', 'error'],
};

module.exports = {
  host: env('TYPEORM_HOST'),
  port: env('TYPEORM_PORT'),
  username: env('TYPEORM_USERNAME'),
  password: env('TYPEORM_PASSWORD'),
  synchronize: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  cli: {
    entitiesDir: path.resolve(__dirname, env('TYPEORM_ENTITIES_DIR')),
  },
  ...baseConfig,
};
