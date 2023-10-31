const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next(); //if not included, will run forever?
}

module.exports = {
    logger
}