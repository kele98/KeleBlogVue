import Cookies from 'js-cookie'

const TokenKey = 'kele_blog_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    console.log("setToken")
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
