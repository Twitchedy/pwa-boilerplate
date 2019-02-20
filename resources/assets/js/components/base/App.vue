<template>
    <div id="app">
        <h1>App Root</h1>
        <router-link to="/">Hello</router-link>
        <router-link to="/world">World</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>
