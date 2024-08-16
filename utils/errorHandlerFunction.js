function errorHandler(func) {
  return (req, res, next) => {
    func(req, res, next).catch(next(err));
  };
}

module.exports = {errorHandler}