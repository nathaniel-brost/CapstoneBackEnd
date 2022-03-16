const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const auth = require('../middleware/auth'); //JWT presence confirmation middleware
const { User, validateUser } = require('../models/user'); //User model and validation
// const auth = require('../middleware/auth');
const photoUpload = require("../middleware/photo-upload");
const excelUpload = require("../middleware/excel-upload");

const router = express.Router();



// register new user with token
router.post('/register', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send(`User already Registered.`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        });

        await user.save();

        const token = user.generateAuthToken();
        
        return res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({_id: user._id, firstName: user.firstName, email: user.email });

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// add image

router.put('/image/:id', photoUpload.single('image'), async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                image: req.file.path
            },
            { new: true }
        );

        if(!user) return res.send(400).send(`User with id ${req.params.id} does not exist.`);

        await user.save();

        return res.send(user);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

// add excel file
router.put('/file/:id', excelUpload.single('file'), async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                file: req.file.path
            },
            { new: true }
        );

        if(!user) return res.send(400).send(`User with id ${req.params.id} does not exist.`);

        await user.save();

        return res.send(user);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

// one edit route for all: 
// about me put
// about collection put
// add youtube link


// get all users
// get one user



module.exports = router;



