require('dotenv').config();
const express               = require('express');
const cors                  = require('cors');
const app                   = express();
const http                  = require('http');
const server                = http.createServer(app);
const { Server }            = require('socket.io');
const io                    = new Server(server);  
const { connecting }        = require('./app/utils/handleConnection')

const PORT        = process.env.PORT              || 3000;
const TYPE_DB     = process.env.SWITCH_TYPEDB     || 'undefined';
const DB          = process.env.SWITCH_DB         || 'text';
const TYPE_FORMAT = process.env.SWITCH_TYPEFORMAT || 'undefined';

connecting(TYPE_DB, DB, TYPE_FORMAT);

app.use((req, res, next) => {
  res.header(     'Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(    'Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

/**
 * Load automatic files directory './routes'
 */
app.use('/api/0.0.1', require('./app/routes'));


io.on('connection', (socket) => {
    socket.on('chart update', (data) => {
      io.emit('chart update', data);
    });  
  });
app.listen(PORT, () => {
    console.log('API ready for port: ', PORT);
});