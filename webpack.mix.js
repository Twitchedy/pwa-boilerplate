let mix = require('laravel-mix');

/**
 * A mix extension that rus eslint as part of the build process.
 */
class Eslint {
    dependencies() {
        this.requiresReload = `
            Dependencies have been installed. Please run "npm run dev" again.
        `;

        return ['eslint', 'eslint-loader'];
    }

    register(options = {}) {
        this.options = options;
    }

    webpackRules() {
        return {
            enforce: "pre",
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: this.options,
        };
    }
}
mix.extend('eslint', new Eslint());

/**
 * Compile assets.
 */
mix.js('resources/assets/js/app.js', 'public/js').eslint({
        fix: false,
        cache: false
    })
    .js('resources/assets/js/serviceworker.js', 'public').eslint({
        fix: false,
        cache: false
    })
    .sass('resources/assets/sass/app.scss', 'public/css');

mix.webpackConfig({
    devtool: 'source-map'
})
.sourceMaps()
