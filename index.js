// import dependencies
const connectDB = require('./startup/db');
const cors = require('cors');
const express = require('express');
const app = express();

const users = require('./routes/users');
const auth = require('./routes/auth');


// connect to db
connectDB();

// app initialization and middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);







// listener
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
