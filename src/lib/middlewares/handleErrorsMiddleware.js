const handleErrorsMiddleware = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
};

export default handleErrorsMiddleware;