const validate = (schema) => (req, res, next) => {
  try {
    // validate body
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({ errors });
    }

    req.body = result.data;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
