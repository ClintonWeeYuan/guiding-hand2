import { Api } from 'types'

const BACKEND_URL =
  import.meta.env['VITE_BACKEND_URL'] || 'http://localhost:8080'

const BACKEND_API = new Api({ baseURL: BACKEND_URL })

export default BACKEND_API
