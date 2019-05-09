const webpack = require('webpack')
const rimraf = require('rimraf')
const promisify = require('util.promisify')
const rimrafAsync = promisify(rimraf).bind(rimraf)
const chalk = require('chalk')

// Ensure this is set before webpack.config.js requires env.js downstream
process.env.HOST = process.env.HOST || 'http://localhost'

const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production')
const paths = require('../config/paths')
const {compilerPromise} = require('./utils')

const build = async () => {
    // Akin to Promise.all()
    const rimrafClientPromse = rimrafAsync(paths.clientBuild)
    const rimrafServerPromse = rimrafAsync(paths.serverBuild)
    await rimrafClientPromse
    await rimrafServerPromse

    const [clientConfig, serverConfig] = webpackConfig
    const multiCompiler = webpack([clientConfig, serverConfig])

    // This is slick but could be faster with an if else
    const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client')
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

    const clientPromise = compilerPromise('client', clientCompiler)
    const serverPromise = compilerPromise('server', serverCompiler)

    serverCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats))
            return
        }
    })

    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(clientConfig.stats))
            return
        }
    })

    // Wait until client and server is compiled
    try {
        await serverPromise
        await clientPromise

        console.log(chalk.magenta('\nCompilation done!'))
        process.exit(0)
    } catch (error) {
        console.log(chalk.red(error))
        process.exit(1)
    }
}

build()
