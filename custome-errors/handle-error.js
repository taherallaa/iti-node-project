const handleError = (err) => {
  const errors = {};

  if (err.code === 11000) {
    Object.values(err).forEach((item) => {
      if (typeof item === "object") {
        errors[Object.keys(item)] = "must be unique";
      }
    });
  }

  if (
    err.message.includes("admin validation failed") ||
    err.message.includes("user validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = handleError;
