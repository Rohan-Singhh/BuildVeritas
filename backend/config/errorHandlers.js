module.exports = (app) => {
    // 404 Handler
    app.use((req, res, next) => res.status(404).json({ msg: 'Not Found' }));
  
    // Global error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ msg: 'Server Error', error: err.message });
    });
  };
  