module.exports = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'missing post data' });
    }
    if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
    }
    next();
}