/* eslint-disable no-console */
import User from './user'

export default {
    options: {
        remember: true
    },

    state: {
        token: null
    },

    get isAdmin () {
        return User.role === 'ADMIN'
    },

    get isLoggedIn () {
        return !!this.state.token
    },

    get isGuest () {
        return !this.isLoggedIn
    },

    initialize () {
        this.state.token = localStorage.getItem('vot_token')
    },

    set (token, remember = true) {
        this.options.remember = !!remember

        if (this.options.remember)
            localStorage.setItem('vot_token', token)
        else
            this.remove()
    },

    get () {
        return localStorage.getItem('vot_token')
    },

    remove () {
        localStorage.removeItem('vot_token')
        this.initialize()
    }
}