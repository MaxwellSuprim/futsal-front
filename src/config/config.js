
import * as axios from "axios"
const http = axios.create({
    baseURL: "http://localhost:9000/",
    timeout: 3000,
    responseType: "json"
})

export const getteam= (url)=>{
    return http.get(url)
    .then((data)=>data.data)
}

export const postteam=(url,data)=>{
    return http.put(url,data)
    .then(console.log)
}
