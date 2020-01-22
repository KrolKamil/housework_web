const { authByPayload } = require('../../utils');

const authErrorMessage = (message) => {
  return {
    response: JSON.stringify({
      type: 'auth_error',
      payload: {
        message: message
      }
    })
  };
};

const auth = async (payload) => {
  const authResponse = await authByPayload(payload);
  if (authResponse.auth === true) {
    return {
      response: JSON.stringify({
        type: 'auth_success'
      })
    };
  }
  return authErrorMessage(authResponse.message);
};

exports.auth = auth;
