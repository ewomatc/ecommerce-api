const errorHandler = (err, req, res, next) => {

	//handle unauthorized error
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json({ error: err })
	}

	//handle validation error
	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err })
	}

	//handle bad request
	if (err.statusCode === 400) {
		return res.status(400).json({ error: err });
	  }
	
	// Handle not found errors
	if (err.statusCode === 404) {
		return res.status(404).json({ error: 'Not Found' });
	  }
	
	// Handle other types of errors
	console.error(err);
	return res.status(500).json({ error: 'Internal Server Error' });

}

module.exports = errorHandler