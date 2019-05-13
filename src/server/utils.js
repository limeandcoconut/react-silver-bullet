import crypto from 'crypto'
const epoch = Math.floor(new Date(new Date().getFullYear(), 0, 1).getTime() / 1000)
/** @module server/utils */

/**
 * Generates a URL safe, 29 character long unique ID based on 64 bits of random
 * @function randomId
 * @return {String} A 29 character long string
 */
export function randomId() {
    const locality = (Math.floor(Date.now() / 1000) - epoch)
    .toString()
    .padStart(8, '0')

    const rand = crypto.randomBytes(8)
    .toString('base64')
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .substr(0, 11)

    return `${locality}${rand}`
}
