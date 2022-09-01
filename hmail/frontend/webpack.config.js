const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "../static/hmail/js"),
        filename: "bundle.js"
    }
};