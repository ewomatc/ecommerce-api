require('dotenv').config()
const { expressjwt: jwt } = require("express-jwt")


function verifyToken() {
	return jwt({
		secret: process.env.SECRET,
		algorithms: ['HS256'],
	}).unless({ 
		path: [
			{ url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },		//using regex to GET (methods) all urls that are products
			{ url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},		//using regex to GET (methods) all urls that are categories
			'/api/v1/users/login', 
			'/api/v1/users/register'
		]
	})
}



module.exports = verifyToken;