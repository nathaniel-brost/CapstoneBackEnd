const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const { User, validateUser } = require('../models/user'); //User model and validation
// const auth = require('../middleware/auth');


const router = express.Router();



// about me put
// about collection put
// login post


// register new user WITHOUT TOKEN
router.post('/register', async (req, res) => {
    try {
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        
        return res
        .send({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


// register new user without token
// router.post('/register', async (req, res) => {
//     try {
//         // const { error } = validateUser(req.body);
//         // if (error) return res.status(400).send(error.details[0].message);

//         // let user = await User.findOne({ email: req.body.email });
//         // if (user) return res.status(400).send(`User already Registered.`);

//         // const salt = await bcrypt.genSalt(10);
//         user = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password
//         });

//         await user.save();

//         // const token = user.generateAuthToken();
        
//         return res
//         // .header('x-auth-token', token)
//         // .header('access-control-expose-headers', 'x-auth-token')
//         .send(user);

//     }catch (ex) {
//         return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
// });



module.exports = router;
