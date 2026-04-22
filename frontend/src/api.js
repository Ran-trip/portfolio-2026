const BASE_URL = 'http://localhost:8000/api'

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options)
  if (res.status === 401) {
    window.dispatchEvent(new Event('unauthorized'))
  }
  return res.json()
}

export async function getSettings() {
  const res = await fetch(`${BASE_URL}/settings.php`)
  return res.json()
}

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/projects.php`)
  return res.json()
}

export async function getProject(id) {
  const res = await fetch(`${BASE_URL}/projects.php?id=${id}`)
  return res.json()
}

export async function getCompetences() {
  const res = await fetch(`${BASE_URL}/competences.php`)
  return res.json()
}

export async function sendContact(data) {
  const res = await fetch(`${BASE_URL}/contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function login(password) {
  const res = await fetch(`${BASE_URL}/auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  return res.json()
}

export async function updateSettings(data, token) {
  return apiFetch(`${BASE_URL}/settings.php`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(data),
  })
}

export async function createProject(data, token) {
  return apiFetch(`${BASE_URL}/projects.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(data),
  })
}

export async function updateProject(id, data, token) {
  return apiFetch(`${BASE_URL}/projects.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(data),
  })
}

export async function deleteProject(id, token) {
  return apiFetch(`${BASE_URL}/projects.php?id=${id}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  })
}

export async function addCompetence(data, token) {
  return apiFetch(`${BASE_URL}/competences.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(data),
  })
}

export async function deleteCompetence(id, token) {
  return apiFetch(`${BASE_URL}/competences.php?id=${id}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  })
}

export async function changePassword(ancien, nouveau, token) {
  return apiFetch(`${BASE_URL}/password.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ ancien, nouveau }),
  })
}

export async function uploadImage(file, token) {
  const formData = new FormData()
  formData.append('image', file)
  return apiFetch(`${BASE_URL}/upload.php`, {
    method: 'POST',
    headers: { Authorization: token },
    body: formData,
  })
}
