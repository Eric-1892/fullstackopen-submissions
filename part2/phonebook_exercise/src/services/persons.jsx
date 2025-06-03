import axios from 'axios'

// 本地部署
const baseUrl = 'http://localhost:3001/api/persons'
// Heroku 部署
//const baseUrl = '/api/persons'

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(response => response.data)
}

const create = (newPerson) => {
    return axios
            .post(baseUrl, newPerson)
            .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
    return axios
            .put(`${baseUrl}/${id}`, updatedPerson)
            .then(response => response.data)
}
  


export default {getAll, create, deletePerson, update}