module.exports = (req, res, next)  => {
    console.log(`Logger: [${new Date().toISOString()}] - ${req.method} to ${req.url}`);
    next();
}