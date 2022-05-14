import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "../axios";
import Loading from "../Loading";

const Reports = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    axios
      .get("reports")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
        setErrors({});
      })
      .catch((err) => {
        setErrors({ error: "An error occured" });
        setIsLoading(false);
        console.log(errors);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <section className="reports-container">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Log Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Description</th>
                <th>Log Created On</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{data.indexOf(row) + 1}</td>
                    <td>{row.log_date}</td>
                    <td>{row.start_time}</td>
                    <td>{row.end_time}</td>
                    <td>{row.description}</td>
                    <td>{row.entered_on}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};

export default Reports;
