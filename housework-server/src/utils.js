const jwt = require('jsonwebtoken');
const { User } = require('./models/user');

const authByPayload = async (payload) => {
  const authResponse = (authenticated, message) => {
    return {
      auth: authenticated,
      message: message
    };
  };

  if (payload.token) {
    try {
      const decoded = jwt.verify(payload.token, process.env.PRIVATE_KEY);
      try {
        const userExists = await User.findOne({ id: decoded.id });
        if (userExists) {
          return authResponse(false, 'user do not exists - reset your hash');
        } else {
          delete payload.token;
          return authResponse(true, decoded.id);
        }
      } catch (e) {
        return authResponse(false, 'internal database error');
      }
    } catch (e) {
      return authResponse(false, 'invalid hash');
    }
  } else {
    return authResponse(false, 'hash key not found');
  }
};

exports.authByPayload = authByPayload;
