const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Main page');
    // res.render('index', {
    //     title: 'Main'
    // });
});

router.get('/create', async (req, res) => {
    // res.json(User);
    // const user = await User.findByEmail('ezhin@mail.ru');
    // console.log(user);
    // const user = await User.create({email: 'ezhin@mail.ru', name: 'Sergey', password: '12345'});
    // console.log(user);
    // res.json(user);
});

router.get('/404', (req, res) => {
    res.json('404');
    // res.render('error/404', {
    //     title: '404'
    // });
});

module.exports = router;