// src/services/api.js

import axios from 'axios'

// Para desenvolvimento local com Docker: use http://localhost:8080
// Para Codespace: use https://SEU-CODESPACE-8080.app.github.dev
// (Encontre a URL pública na aba Ports do Codespace)

const BASE_URL = 'https://musical-train-jx4xxgr5x66hpxjq-8080.app.github.dev'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
