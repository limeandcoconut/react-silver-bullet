// Update this url in ./meta.js too. It saves 20K from the bundles by doing it manually.
const productionHost = 'https://local.jacobsmith.tech'
const gaDevID = 'UA-#########-#'
const gaProductionID = 'UA-#########-#'

// NOTE: This file is included in client. Don't put secrets in here. They go in keys.js
module.exports = {
    productionHost,
    gaID: process.env.LIVE_GA === 'true' ? gaProductionID : gaDevID,
}
