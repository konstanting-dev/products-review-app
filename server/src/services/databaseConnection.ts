import { createConnection, getConnectionManager } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
export const connect = async () => {
  if (getConnectionManager().has('default')) {
    await getConnectionManager().get().close();
  }

  let connectOptions: any = {
    name: 'default',
    type: 'mongodb',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    synchronize: false,
    logging: ['warn', 'error'],
    entities: [process.env.TYPEORM_ENTITIES],
    seeds: [process.env.TYPEORM_SEEDS],
    factories: [process.env.TYPEORM_FACTORIES],
  };

  if (process.env.TYPEORM_URL) {
    connectOptions = {
      ...connectOptions,
      url: process.env.TYPEORM_URL,
    };
  } else {
    connectOptions = {
      ...connectOptions,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port:
        process.env.TYPEORM_PORT && !Number.isNaN(+process.env.TYPEORM_PORT) ? +process.env.TYPEORM_PORT : undefined,
    };
  }

  return await createConnection(connectOptions);
};
