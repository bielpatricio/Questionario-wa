import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://opentdb.com'
})

export const busca = async(url, setDado) => {
    // const num = url;
    const result = await api.get(url)
    console.log(result)
    // console.log(url)
    setDado(result.data.results)
}