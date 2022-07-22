export const SERVER_URL = process.env.NODE_ENV === "development" ?
  "http://localhost:8080" :
  "https://bestdotaeu-codenames-backend.herokuapp.com"