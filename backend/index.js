const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const disasterRoutes = require('./routes/disasterRoutes');
const socialRoutes = require('./routes/socialRoutes');
const geocodeRoutes = require('./routes/geocode');
const verifyRoutes = require('./routes/verificationRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const updateRoutes = require('./routes/updateRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use('/disasters', disasterRoutes);
app.use('/social-media', socialRoutes);
app.use('/geocode', geocodeRoutes);
app.use('/verification', verifyRoutes);
app.use('/resources', resourceRoutes);
app.use('/updates', updateRoutes);

io.on('connection', socket => {
  console.log('Client connected');
});

app.set('socketio', io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
