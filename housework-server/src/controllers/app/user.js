const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, validateUser, userAuthErrorObject } = require('../../models/user');

module.exports = {
  register: async (req, res) => {
    try {
      await validateUser(req.body);
    } catch (error) {
      return res.status(400).json(userAuthErrorObject(error.details[0].message));
    }
    const hashedPassword = bcrypt.hashSync(req.body.password);
    try {
      const queryResponse = await User.findOne({ name: req.body.name });
      if (queryResponse) {
        return res.status(400).json(userAuthErrorObject('user exists'));
      }
    } catch (e) {
      return res.status(500).json(userAuthErrorObject('internal databse error'));
    }
    User.create({
      name: req.body.name,
      password: hashedPassword
    }, (error, user) => {
      if (error) {
        return res.status(400).json(userAuthErrorObject('database error'));
      }
      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: 86400
      });
      res.status(200).json({ auth: true, token: token });
    });
  },
  login: async (req, res) => {
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('password')) {
      return res.status(400).json(userAuthErrorObject('invalid request'));
    }
    try {
      const findedUser = await User.findOne({ name: req.body.name });
      if (!findedUser) {
        return res.status(404).json(userAuthErrorObject('user not found'));
      }
      const isPasswordValid = bcrypt.compareSync(req.body.password, findedUser.password);
      if (!isPasswordValid) {
        return res.status(401).json(userAuthErrorObject('wrong password'));
      }
      const token = jwt.sign({ id: findedUser._id }, process.env.PRIVATE_KEY);
      res.status(200).json({ auth: true, token: token });
    } catch (e) {
      return res.status(400).json(userAuthErrorObject('invalid request'));
    }

    // User.findOne({ name: req.body.name }, (error, user) => {
    //   if (error) {
    //     return res.status(500).json(userAuthErrorObject('unknown error'));
    //   }
    //   if (!user) {
    //     return res.status(404).json(userAuthErrorObject('user not found'));
    //   }
    //   const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    //   if (!isPasswordValid) {
    //     return res.status(401).json(userAuthErrorObject('wrong password'));
    //   }

    //   const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
    //   res.status(200).json({ auth: true, token: token });
    // });
  }
};
