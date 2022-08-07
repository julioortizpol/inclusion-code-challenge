import Header from './Header'
import CardList from './CardList'
import './App.css';

function getStatus(){
  return [
    {
      "name": "ApiName",
      "success": true,
      "message": "Healthy :3",
      "hostname": "datapoints-72c097ecffdd",
      "time": 1659880299821
  },
  {
    "name": "ApiName",
    "success": true,
    "message": "Healthy :3",
    "hostname": "datapoints-72c097ecffdd",
    "time": 1659880299821
},
{
  "name": "ApiName",
  "success": true,
  "message": "Healthy :3",
  "hostname": "datapoints-72c097ecffdd",
  "time": 1659880299821
},
{
  "name": "ApiName",
  "success": true,
  "message": "Healthy :3",
  "hostname": "datapoints-72c097ecffdd",
  "time": 1659880299821
},
{
  "name": "ApiName",
  "success": true,
  "message": "Healthy :3",
  "hostname": "datapoints-72c097ecffdd",
  "time": 1659880299821
}

  ]
}

function App() {
  return (
    <div >
      <Header/>
      <CardList list = {getStatus()}/>
    </div>
  );
}

export default App;
