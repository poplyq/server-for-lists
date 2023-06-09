const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizatinHeader = req.headers.authorization;
    if (!authorizatinHeader) {
      return next(ApiError.UnautorizedError());
    }
    const accessToken = authorizatinHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.body.id = userData.id;
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
};
