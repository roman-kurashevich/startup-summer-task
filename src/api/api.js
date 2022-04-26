import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/users/",
});

// axios.interceptors.response.use(
//   function (response) {
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     console.log("---------------- ", error);
//     return Promise.reject(error);
//   }
// );
