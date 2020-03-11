import axios from 'axios'

let baseURL = 'http://localhost:3000/'

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
