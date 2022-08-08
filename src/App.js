import Header from "./Header";
import CardList from "./CardList";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./App.css";

const apiCallIntervalTime = 15000; // time in milliseconds
const apis = [
  { name: "accounts" },
  { name: "assets" },
  { name: "customers" },
  { name: "datapoints" },
  { name: "devices" },
  { name: "documents" },
  { name: "forms" },
  { name: "invites" },
  { name: "media" },
  { name: "messages" },
  { name: "namespaces" },
  { name: "orders" },
  { name: "patients" },
  { name: "relationships" },
  { name: "rules" },
  { name: "templates" },
  { name: "users" },
  { name: "workflows" },
];
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const getStatusHealthEndPoint = (apiName) =>
  `https://api.factoryfour.com/${apiName}/health/status`;

function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

function App() {
  const [apiStatusList, setApiStatusList] = useState([]);

  async function getApiStatus() {
    try {
       const responses = await Promise.allSettled(
        apis.map(
          async (api) => await axios.get(getStatusHealthEndPoint(api.name))
        )
      );
      const apisStatusList = responses.map((response, index) => {
        if (response.status === "fulfilled") {
          return {
            name: apis[index].name,
            time: convertMsToHM(response.value.data.time),
            success: response.value.data.success,
            message: response.value.data.message,
            hostname: response.value.data.hostname
          };
        } else {
          return {
            name: apis[index].name,
            success: false,
            message: response.reason.message,
            status: response.reason.response.status,
          };
        }
      })
      setApiStatusList(
        apisStatusList
      );
    } catch (err) {}
  }
  const onlyCallOnce = (()=>{
    var called = true
    return () => {
      if(called) {
        getApiStatus()
        setInterval(getApiStatus, apiCallIntervalTime)
      }
      called = false
    }
  })()

  useEffect(() => {
    onlyCallOnce()
  }, []);

  return (
    <div>
      <Header />
      <CardList list={apiStatusList} />
    </div>
  );
}

export default App;
