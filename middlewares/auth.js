require('dotenv').config()
const { expressjwt: jwt } = require("express-jwt")


function verifyToken() {
	const secret = process.env.SECRET 
	return jwt({
		secret,
		algorithms: ['HS256']
	})
}


module.exports = verifyToken;