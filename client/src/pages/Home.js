import React, { useState, useEffect } from "react";
import Alert from "../Alert";
import axios from "../axios";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [classNames, setClassNames] = useState("");
  const [log, setLog] = useState({
    logDate: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLog({ ...log, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (log.logDate && log.startTime && log.endTime && log.description) {
      axios
        .post("", log)
        .then((res) => {
          console.log(res.data);
          setShowAlert(true);
          setAlertText(res.data + " Added");
          setClassNames("alert alert-success");
          setLog({ logDate: "", startTime: "", endTime: "", description: "" });
        })
        .catch((error) => {
          console.log(error);
          setShowAlert(true);
          setAlertText("An error occured");
          setClassNames("alert alert-danger");
        });
    } else {
      setShowAlert(true);
      setAlertText("Field can not be empty");
      setClassNames("alert alert-danger");
    }
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
    }
  });
  return (
    <section className="section-center">
      {showAlert ? (
        <Alert text={alertText} classNames={classNames} />
      ) : (
        <div></div>
      )}
      <form className="form">
        <div style={{ textAlign: "center" }}>
          <h3>Time Logger</h3>
        </div>
        <div className="form-control">
          <label htmlFor="logDate">Log Date: </label>
          <input
            id="logDate"
            name="logDate"
            type="date"
            value={log.logDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="startTime">Start Time: </label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            value={log.startTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="endTime">End Time: </label>
          <input
            id="endTime"
            name="endTime"
            type="time"
            value={log.endTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            rows="7"
            cols="40"
            id="description"
            name="description"
            value={log.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Home;
