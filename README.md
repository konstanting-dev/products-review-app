# Getting Started with Product Reviews Application

1. Set up environment variables by creating `.env` from `.env.example`

2. Start server and MongoDB:

        docker-compose up

3. Seed the database with products:

        docker exec -it products_server sh
        npm run seed:run

4. Start client application you need to run:

        cd client

5. Set up environment variables by creating `.env` from `.env.example`
   
        yarn start
