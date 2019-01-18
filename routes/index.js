const express = require('express');
const passport = require('passport');
const Account = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
	res.render('register', {});
});

router.post('/register', (req, res, next) => {
	console.log('registering user');
	Account.register(new Account({ username: req.body.username }), req.body.password, (err) => {
		if (err) {
			console.log('error while user register!', err);
			return next(err);
		}

		console.log('user registered!');

		res.redirect('/');
	});
});

router.get('/login', (req, res) => {
	res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
