const path = require('path');

module.exports = {
    entry: './js/script.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    experiments: {
        topLevelAwait: true
    },
};