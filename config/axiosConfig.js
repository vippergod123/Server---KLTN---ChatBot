
var Axios = require('axios');

const axios = Axios

const domain = "http://localhost:5001"
// const domain = "https://server-college-handbook.herokuapp.com"

axios.defaults.baseURL = domain
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3002';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:3002';
axios.defaults.withCredentials = true




module.exports = axios