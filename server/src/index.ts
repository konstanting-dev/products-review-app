import { configureApp } from 'src/app';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.SERVER_PORT || 3001;

(async () => {
  const app = await configureApp();
  return app.listen(port);
})();
