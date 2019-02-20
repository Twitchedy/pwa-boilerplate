import Vue from 'vue'
import store from './store'
import router from './router'
import App from '~/components/base/App'
import axios from 'axios'
import $ from 'jquery'

axios.defaults.headers.common = {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').text(),
    'X-Requested-With': 'XMLHttpRequest'
}
Vue.prototype.$http = axios

// Init SPA.
new Vue({
    router,
    store,
    template: '<App/>',
    components: { App }
}).$mount('#app')

// PWA stuff.
if ('serviceWorker' in navigator) {
    /**
     * Define if <link rel='next|prev|prefetch'> should
     * be preloaded when accessing this page
     */
    const PREFETCH = true

    /**
     * Define which link-rel's should be preloaded if enabled.
     */
    const PREFETCH_LINK_RELS = ['index', 'next', 'prev', 'prefetch']

    /**
     * prefetchCache
     */
    let prefetchCache = () => {
        if (navigator.serviceWorker.controller) {
            let links = document.querySelectorAll(
                PREFETCH_LINK_RELS.map((rel) => {
                    return 'link[rel=' + rel + ']'
                }).join(',')
            )

            if (links.length > 0) {
                Array.from(links)
                    .map((link) => {
                        let href = link.getAttribute('href')
                        navigator.serviceWorker.controller.postMessage({
                            action: 'cache',
                            url: href
                        })
                    })
            }
        }
    }

    /**
     * Register Service Worker
     */
    navigator.serviceWorker
        .register('/serviceworker.js', { scope: '/' })
        .then(() => {
            console.log('Service Worker Registered')
        })

    /**
     * Wait if ServiceWorker is ready
     */
    navigator.serviceWorker
        .ready
        .then(() => {
            if (PREFETCH) {
                prefetchCache()
            }
        })
}
