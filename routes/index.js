const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login');
const Account = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('pages/index', { user: req.user });
});

router.get('/register', (req, res) => {
	res.render('pages/register', { error: req.flash('error') });
});

router.post('/register', (req, res) => {
	Account.register(new Account({ username: req.body.username }), req.body.password, (err) => {
		if (err) {
			return res.render('pages/register', { error: err.message });
		}
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/register',
			failureFlash: true,
		})(req, res, () => {});
	});
});

router.get('/login', (req, res) => {
	res.render('pages/login', { error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
	successReturnToOrRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
}));

router.get('/profile',
	ensureLoggedIn.ensureLoggedIn('/login'),
	(req, res) => {
		res.render('pages/profile', { user: req.user });
	});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
