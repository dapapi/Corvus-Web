const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/client.index.js', 'public/js')
    .js('resources/assets/js/client.detail.js', 'public/js')
    .js('resources/assets/js/left-menu.js', 'public/js')
    .js('resources/assets/js/login.js', 'public/js')
    .js('resources/assets/js/moe.js', 'public/js')
    .js('resources/assets/js/project.index.js', 'public/js')
    .js('resources/assets/js/project.detail.js', 'public/js')
    .js('resources/assets/js/task.index.js', 'public/js')
    .js('resources/assets/js/papi.detail.js', 'public/js')
    .js('resources/assets/js/papi.index.js', 'public/js')
    .js('resources/assets/js/task.detail.js', 'public/js')
    .js('resources/assets/js/tool.js', 'public/js')
    .js('resources/assets/js/trail.index.js', 'public/js')
    .js('resources/assets/js/trail.detail.js', 'public/js')
    .js('resources/assets/js/taiyang.detail.js', 'public/js')
    .js('resources/assets/js/taiyang.index.js', 'public/js')

    .sass('resources/assets/sass/base.scss', 'public/css')
    .sass('resources/assets/sass/login.scss', 'public/css')
    .sass('resources/assets/sass/side-mask.scss', 'public/css')
    .sass('resources/assets/sass/task.scss', 'public/css')
    .sass('resources/assets/sass/v1.scss', 'public/css').version();
