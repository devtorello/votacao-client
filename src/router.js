import { Router } from 'vue-fancy-router'

const Route = new Router({ linkExactActiveClass: 'is-active' }, comp => {
    if (comp != '')
        comp = `/${comp}`
    
    return require(`./views${comp}`).default
})

Route.add('/login', 'Auth/Login', 'login')

Route.add('/', '').children(() => {
    Route.group('', () => {

    })
})

export const router = Route.build()