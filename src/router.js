import { Router } from 'vue-fancy-router'

const Route = new Router({ linkExactActiveClass: 'uk-active' }, comp => {
    if (comp != '')
        comp = `/${comp}`
    
    return require(`./views${comp}`).default
})

Route.add('/', '').children(Route => {
    Route.add('', 'Home')
    Route.add('login', 'Auth/Login', 'login')
    Route.add('register', 'Auth/Register', 'register')
    Route.add('vote', 'VotingArea')
    Route.add('admin', 'Admin').children(Route => {
        Route.add('', 'Admin/Dashboard')
        Route.add('apurar', 'Admin/ApurarVotos')
        Route.add('candidatos', 'Admin/Candidatos').children(Route => {
            Route.add('', 'Admin/Candidatos/ListarCandidatos')
            Route.add('novo', 'Admin/Candidatos/CadastrarCandidato')
        })
    })
})
export const router = Route.build()