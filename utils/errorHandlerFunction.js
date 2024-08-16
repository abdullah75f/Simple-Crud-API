const customErrorclass = require("../utils/customErrorClass.js");
function errorHandlerFunction(func) {
  return (req, res, next) => {
    func(req, res).catch((err) => {
      next(err);
    });
  };
}

module.exports = { errorHandlerFunction };
