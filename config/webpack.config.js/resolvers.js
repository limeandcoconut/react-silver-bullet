const paths = require('../paths')
const path = require('path')

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css', '.less'],
    modules: paths.resolveModules,
    alias: {
        // For less
        '@assets': path.resolve(__dirname, 'src/shared/assets/'),
    },
}
