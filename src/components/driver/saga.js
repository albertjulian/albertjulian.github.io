import axios from "axios";
import { serverUrl } from "../url";

export async function getDriverFunction(param) {
  return new Promise(async (resolve) => {
    axios
      .get(serverUrl)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        const error = err.toString();
        param.error = error;
        resolve(param);
      });
  });
}
