const path = require("path");

const config = {
    entry: "./source/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'base.js'
    }
};

module.exports = config;