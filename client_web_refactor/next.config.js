const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const config = {
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        return config
    }
};

module.exports = withSass(
    withCSS(config)
);
