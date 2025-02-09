README

The application contains inbuilt SQLite database. It should be configured and create table (if not exist) automatically while first run. Before interact with application ensure that database with name "resource.db" was created. It could require several seconds.

By default, application will use port 3000. If you are willing to set your own port you should create *.env* file in *Problem5* directory with next content:

```dotenv
PORT={{YOUR_PORT}}
```

To run the application move to *Problem5* directory ```cd Problem5``` and run next commands:

```shell
npm install
npm build
npm start
```

If you want to run application in development just run:

```shell
npm install
npm run dev
```