import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/users/",
  headers: { Authorization: "token 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" },
});
