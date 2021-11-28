const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 4000;

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use('*', cors({ origin: 'http://localhost:8080' }));
}
if (process.env.NODE_ENV === 'production') {
  app.use('*', cors({ origin: `http://localhost:${PORT}` }));
}
app.use(express.static('client/build'));
app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join('client/build') });
});

app.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});
