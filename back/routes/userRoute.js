import express from 'express'
import User from '../models/userModel'
import {getToken, isAuth} from '../utils'
const bcrypt = require("bcryptjs");


export const router = express.Router();

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
    // let hash = bcrypt.hashSync(req.body.password, 14);
    // req.body.password = hash

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
        email: req.body.email,
        password: req.body.password,
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
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find({});
    try {
        const userMap = {};
        users.forEach((user) => {
            userMap[user._id] = user;
        });

        res.send(userMap);
        // res.send({users: users}, {message: "Server works well!"});
    } catch (error) {
        res.send({message: error.message});
    }
});


export default router;
