const crypto = require('crypto');
/**
 * Create password hash.
 *
 * @param {string} pass
 * @param {string} secret
 * @param {string} algorithm
 *
 * @return string
 */
const hash = (pass, secret = 'IgorStcherbina', algorithm = 'sha256') => crypto.createHmac(algorithm, secret)
		.update(pass)
		.digest('hex');

module.exports = {
	hash : hash
};
