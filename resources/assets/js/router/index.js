import Vue from 'vue'
import Router from 'vue-router'
import Hello from '~/components/Hello'
import World from '~/components/World'
import NotFound from '~/components/base/NotFound'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/world',
        name: 'World',
        component: World
    }, {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }]
})
