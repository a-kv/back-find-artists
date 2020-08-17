import express from 'express'
import User from '../models/userModel'
import {getToken, isAuth} from '../utils'

let secured = require('../middleware/getUser');
const bcrypt = require("bcryptjs");


export const router = express.Router();

// router.get('/u', secured(), function (req, res, next) {
//     const { _raw, _json, ...userProfile } = req.user;
//     res.render('user', {
//         userProfile: JSON.stringify(userProfile, null, 2),
//         title: 'Profile page'
//     });
// });

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    try {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isArtist: updatedUser.isArtist,
            token: getToken(updatedUser),
        });
        // res.redirect('/profile')
    } catch (e) {
        res.status(404).send({message: 'User Not Found'});
    }
});

router.post('/register', async (req, res) => {
    // hashing password
    let hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash

    const user = new User(req.body)
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     isArtist: req.body.isArtist,
    //
    // });
    try {
        const newUser = await user.save();
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isArtist: newUser.isArtist,
            token: getToken(newUser),
        });
        // res.redirect('/login')
    } catch (e) {
        res.status(400).send({message: `Invalid User Data: ${e}`});
    }
});

router.post('/login', async (req, res) => {
    const loginUser = await User.findOne({
        email: req.body.email
        // password: req.body.password,
    // }, (err, user) => {
    //     if (!loginUser || !bcrypt.compareSync(req.body.password, loginUser.password)) {
    //         return res.render('login',{
    //             error: 'Invalid email or password.'
    //         })
    //     }
    //     req.session.userId = user._id

    });
    try {
        res.send({
            _id: loginUser.id,
            name: loginUser.name,
            email: loginUser.email,
            isArtist: loginUser.isArtist,
            token: getToken(loginUser),

        });
    } catch {
        res.status(401).send({message: 'Invalid email or password.'});
    // }
}});


router.get('/', async (req, res) => {
    try {
        res.send({message: "Server works well!"});
    } catch (error) {
        res.send({message: error.message});
    }
});
// router.get('/', async (req, res) => {
//     try {
//         const user = new User({
//             name: 'Anna',
//             email: 'test123456@mail.ru',
//             password: 'test1234566',
//             isArtist: true,
//         });
//         const newUser = await user.save();
//         res.send(newUser);
//     } catch (error) {
//         res.send({message: error.message});
//     }
// });
export default router;
