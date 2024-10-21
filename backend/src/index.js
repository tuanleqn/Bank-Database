const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});