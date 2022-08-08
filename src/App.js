import Header from "./Header";
import CardList from "./CardList";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./App.css";

const apiIntervalTime = 15000; // time in milliseconds
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

const getStatusHealthEndPoint = (apiName) =>
  `https://api.factoryfour.com/${apiName}/health/status`;

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
            ...response.value.data,
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
        setInterval(getApiStatus, apiIntervalTime)
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
