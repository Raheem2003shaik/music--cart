import React, { useState, useEffect } from "react";
import "./ServerStatus.css";
import Loading from "../loading/Loading";
import axios from "axios";
import NotFound from "../Error/NotFound";
;

const ServerStatus = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${'https://musicart-80cn.onrender.com'}/health`)
      .then((res) => {
        setHealthData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="health-component">
      <h1>Health Status</h1>
      {loading ? (
        <Loading />
      ) : healthData ? (
        <>
          <p>Server: {healthData.server}</p>
          <p>Database: {healthData.database}</p>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ServerStatus;