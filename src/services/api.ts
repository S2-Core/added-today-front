import axios from "axios";

export const api = axios.create({
  baseURL: "https://c209d1aaf941.ngrok-free.app",
  timeout: 30000,
});
