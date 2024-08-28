import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then((response) => {
        return response.data
    })
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => id)
}

const update = (personObject) => {
    const request = axios.put(`${baseUrl}/${personObject.id}`, personObject)
    return request.then((response) => {
        return response.data
    })
}


export default { create, remove, update }
