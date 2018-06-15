import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: 'http://localhost:8081'
    baseURL: 'https://www.aismagellan.io/api/things/pull/5d788b90-4ead-11e8-bd62-15911fb825ae'
  })
}
