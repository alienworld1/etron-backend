const createError = require('http-errors');
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  const error = req.app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message,
    error,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
