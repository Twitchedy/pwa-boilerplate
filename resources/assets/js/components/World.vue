<template>
    <div>
        <h1>World</h1>
    </div>
</template>

<script>
export default {
    name: 'world',
    mounted () {
        // Unautheticated route.
        this.$http.get('/api/v1/hello').then(res => {
            console.log(res.data)
        })

        // Login using JWT.
        this.$http.post('/api/v1/auth/login', {
            email: 'example@web.com',
            password: 'password'
        }).then(res => {
            // Add the auth token to the requests. This can be stored in
            // local storage to survive page reloads.
            this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token

            // Authenticated request.
            this.$http.get('/api/v1/auth/user').then(res => {
                console.log(res.data)
            })
        })
    }
}
</script>
