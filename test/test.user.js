const should = require('should');
const mongoose = require('mongoose');
const Account = require('../models/user.js');

describe('Account', () => {
	before((done) => {
		mongoose.connect('mongodb://localhost/test');
		done();
	});

	after((done) => {
		mongoose.connection.close();
		done();
	});

	beforeEach((done) => {
		const account = new Account({
			username: '12345',
			password: 'testy',
		});

		account.save((error) => {
			if (error) console.log(`error ${error.message}`);
			else console.log('no error');
			done();
		});
	});

	it('find a user by username', (done) => {
		Account.findOne({ username: '12345' }, (err, account) => {
			account.username.should.eql('12345');
			console.log('   username: ', account.username);
			done();
		});
	});

	afterEach((done) => {
		Account.remove({}, () => {
			done();
		});
	});
});
