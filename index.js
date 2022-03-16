// import dependencies
const connectDB = require('./startup/db');
const cors = require('cors');
const express = require('express');
const app = express();

const users = require('./routes/users');
const items = require('./routes/items');
const auth = require('./routes/auth');

const fs = require('fs');
const path = require('path');

// connect to db
connectDB();



// app initialization and middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/auth', auth);


app.use('uploads/images', express.static(path.join('uploads', 'images')));
app.use('uploads/items', express.static(path.join('uploads', 'items')));





// listener
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
