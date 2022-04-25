import axios from 'axios'

export default axios.create({
     baseURL: "https://ecommerce-server-test.herokuapp.com/"
     // baseURL: "http://localhost:3006/"
})