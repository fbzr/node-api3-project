const userDb = require('../users/userDb');

module.exports = async (req, res, next) => {
    const user = await userDb.getById(parseInt(req.params.id));
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(400).json({ message: 'Invalid user id' });
    }
}