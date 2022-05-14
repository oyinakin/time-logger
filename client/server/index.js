const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pg_pool } = require("./db_config");
const app = express();
const port = process.env.port_2 || 3001;

const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: "Hello from server!" });
});

app.get("/reports", (request, response) => {
  pg_pool.query(
    "SELECT * from public.time_logs ORDER BY log_date, start_time",
    (err, res) => {
      if (err) {
        throw err;
      }
      response.header("Access-Control-Allow-Origin", "*");
      response.send(res.rows);
    }
  );
});

app.post("/", (req, res) => {
  const newLog = {
    logDate: req.body.logDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    enteredOn: new Date(),
  };
  console.log(newLog);

  //validate data
  //****************************************************** */
  let errors = {};
  if (isEmpty(newLog.logDate)) {
    errors.logDate = "Must not be empty";
  }

  if (isEmpty(newLog.startTime)) {
    errors.startTime = "Must not be empty";
  }

  if (isEmpty(newLog.endTime)) {
    errors.endTime = "Must not be empty";
  }
  if (isEmpty(newLog.description)) {
    errors.description = "Must not be empty";
  }
  if (Object.keys(errors).length > 0) return response.status(400).json(errors);

  //Check for duplicate entry otherwise insert form_data into database time_log
  pg_pool.query(
    `SELECT * from public.time_logs where logDate = '${newLog.logDate}' and startTime = '${newLog.startTime}' and endTime = '${newLog.endTime}' and description = '${newLog.description}'`,
    (err, results) => {
      if (!results) {
        pg_pool.query(
          "INSERT INTO public.time_logs(log_date, start_time, end_time, description, entered_on) VALUES ( $1, $2, $3, $4, $5) RETURNING *",
          [
            newLog.logDate,
            newLog.startTime,
            newLog.endTime,
            newLog.description,
            newLog.enteredOn,
          ],
          (insert_err, insert_results) => {
            if (insert_err) {
              res.header("Access-Control-Allow-Origin", "*");
              res.status(500).send(`Error: ${insert_err}`);
            } else {
              res.header("Access-Control-Allow-Origin", "*");
              res
                .status(201)
                .send(`Log added with ID: ${insert_results.rows[0].log_id}`);
            }
          }
        );
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).send(`Log already exists: ${newLog.logDate}`);
      }
    }
  );
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
