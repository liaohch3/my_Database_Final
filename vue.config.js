const CopyCloudFunctionsPlugin = require('./build/copy-cloudfunctions-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyCloudFunctionsPlugin()
        ]
    }
}
