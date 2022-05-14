const pg = require("pg");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//database config
const dbServer = {
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
  host: process.env.host,
};

const pg_pool = new pg.Pool(dbServer);
const pg_client = new pg.Client(dbServer);

//Test database connection
pg_client
  .connect()
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => console.error("connection error", err.stack));

module.exports = { pg_pool };
