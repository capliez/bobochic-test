const Encore = require('@symfony/webpack-encore');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const NAME = "Bobochic - Webpack Encore";

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. main.scss) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')
    .addEntry('promoCode', './assets/styles/promoCode/main.scss')
    .addEntry('bannerReinsurance', './assets/styles/reinsurance/main.scss')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureTerserPlugin((options) => {
        options.extractComments = false;
        options.parallel = true;
        options.terserOptions = {
            mangle: true,
            compress: {
                drop_console: true,
                drop_debugger: true,
                warnings: false,
                booleans: true,
                dead_code: true,
                collapse_vars: true,
                comparisons: true,
                conditionals: true,
                evaluate: true,
                hoist_funs: true,
                hoist_props: true,
                inline: true,
                join_vars: true,
                loops: true,
                negate_iife: true,
                properties: true,
                passes: true,
                pure_funcs: true,
                pure_getters: true,
                reduce_funcs: true,
                reduce_vars: true,
                sequences: true,
                side_effects: true,
                switches: true,
            },
            output: {
                comments: false,
            },
        };
    })

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

if (Encore.isProduction()) {
    Encore.addPlugin(
        new CompressionWebpackPlugin({
            test: /\.(js|css|scss|jsx|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
        }),
    );
}

// Minify code
const optimization = {
    minimize: Encore.isProduction(),
    minimizer: [new TerserPlugin()],
};

module.exports = {
    ...Encore.getWebpackConfig(),
    name: NAME,
    optimization,
};

