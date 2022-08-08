import Header from "./Header";
import CardList from "./CardList";
import { useEffect, useState, useRef } from "react";
import getApiHealthStatus from './getApiHealthStatus'
import "./App.css";
const apiCallIntervalTime = 15000; // time to repeat health status api call in milliseconds

function App() {
  const [apiStatusList, setApiStatusList] = useState([]);

  async function getApiStatus() {
    try {
      const apisStatusList = await getApiHealthStatus()
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
