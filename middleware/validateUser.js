module.exports = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Missing user data' })
    } 

    if(!req.body.name) {
        return res.status(400).json({ message: 'missing required name field' });
    }
    next();
}