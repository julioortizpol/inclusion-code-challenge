import convertMsToHM from './utilities/convertMsToHM'
import axios from "axios";

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

export default async function getApiStatus() {
    try {
       const responses = await Promise.allSettled(
        apis.map(
          async (api) => await axios.get(getStatusHealthEndPoint(api.name))
        )
      );
      return responses.map((response, index) => {
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
    } catch (err) {}
  }