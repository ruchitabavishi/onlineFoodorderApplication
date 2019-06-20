import axios from 'axios'

const baseURL = 'http://temp.dash.zeta.in'

export default axios.create({
    baseURL
})