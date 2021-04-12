
## Getting started

1. Clone this repository 

   ```bash
   git clone https://github.com/rickynich/t-to-do.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example file

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file:

```bash
CREATE USER ttodo_app_dev WITH CREATEDB PASSWORD 'password';
CREATE DATABASE ttodo_app WITH OWNER ttodo_app_dev;
```

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```
   (This will also seed the database)

   ```bash
   flask run
   ```

6. To run the React App in development, open up another terminal instance and cd to the `react-app` directory. Then run:

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```



