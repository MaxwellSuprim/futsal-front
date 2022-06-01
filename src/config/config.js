
import * as axios from "axios"
const http = axios.create({
    baseURL: "http://localhost:9000/",
    timeout: 3000,
    responseType: "json"
})

export const httpGet= (url)=>{
    return http.get(url)
    .then((data)=>data.data)
}

export const httpPut=(url,data)=>{
    return http.put(url,data)
    .then(console.log)
}
