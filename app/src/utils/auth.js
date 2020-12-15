
const KEY = 'token'

export const saveUserToken = (token) => {
    localStorage.setItem(KEY, token)
}

export const getUserToken = (token) => {
    return localStorage.getItem(KEY, token)
}

export const deleteUserToken = (token) => {
    localStorage.removeItem(KEY)
}