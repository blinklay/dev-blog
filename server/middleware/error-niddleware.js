module.exports = function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Unexpected error";

  if (status === 500) {
    return res.status(status).json({ message: "Ошибка сервера!" });
  }

  res.status(status).json({ message });
};
