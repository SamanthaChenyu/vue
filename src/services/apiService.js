import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '',
  withCredentials: false,
  timeout: 5 * 1000
})

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    error.message = '網路異常，請稍候重置。'
    Message.error(error.message || 'Error', 5 * 1000)
    console.log('[AxiosError]', error)
    return Promise.reject(error)
  }
)

const getFromData = function (object) {
  console.log(object)
  const form = new FormData()
  for (const key in object) {
    const value = object[key]
    form.append(key, value)
  }
  return form
}

export async function post(url, params, options = {}) {
  try {
    const data = options.type === 'form-data' ? getFromData(params) : params
    const res = await axiosInstance.post(url, data)
    return res.data
  } catch (err) {
    err.message = '網路異常'
    return err
  }
}

export async function get(url, params, options = {}) {
  try {
    const res = await axiosInstance.get(url, { params })
    return res.data
  } catch (err) {
    err.message = '網路異常'
    return err
  }
}

export async function _delete(url, params, options = {}) {
  try {
    const res = await axiosInstance.delete(url)
    return res.data
  } catch (err) {
    console.log(err)
    err.message = '網路異常'
    return err
  }
}
