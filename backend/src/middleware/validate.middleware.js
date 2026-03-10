const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      // Zod error messages
      const errors = err.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));
      res.status(400).json({ errors });
    }
  };
};

module.exports = validate;
