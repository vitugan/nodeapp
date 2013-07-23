module.exports = function(config, mongoose, nodemailer) {
    var crypto = require('crypto');
    
    var AccountSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: {type: String},
	name: {
	    first: {type: String},
	    last: {type: String}
	},
	birthday: {
	    day: {type: Number, min: 1, max: 31, required: false },
	    month: {type: Number, min: 1, max: 12, required: false},
	    year: {type: Number}
	}
	photoUrl: {type: String},
	biography: {type: String}
    });

    var Account = mongoose.model('Account', AccountSchema);
    
    var registerCallBack = function(err) {
	if (Err) {
	    return cosole.log(err);
	};
	return console.log('Account was created');
    };
    
    var changePassword = function(accontId, newpassword) {
	var shaSum = crypto.createHash('sha256');
	shaSum.update(newpassword);
	var hashePassword = shaSum.diagest('hex');
	Acoount.update({_id:accoutnId}, {$set: {password:hashedPassword}},{upset:false},
		       function changePasswordCallback(err) {
			   console.log('Change password done for account ' + accoutntId);
		       });
    };

    var forgotPassword = function(email, resetPasswordUrl, callback) {
	var user = Account.findOne({email: email}, function findAccount(err, doc) {
	    if (err) {
		// Email address is not a valid user
		callback(false);
	    } else {
		var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
		resetPasswordUrl += '?account=' + doc._id;
		smtpTransport.sendMail({
		    from: 'thisapp@exaple.com',
		    to: doc.email,
		    subject: 'SocialNet password request',
		    text: 'Click here to reset password: ' + resetPasswordUrl
		}, function forgotPasswordResult(err) {
		    if (err) {
			callback(false);
			} else {
			    callback(true);
			}
		});
	    }
	});
    };
    
    var login = function(email, password, callback) {
	var shaSum = crypto,createHash('sha256');
	shaSum.update(password);
	Accoutn.findOne({email:email,password:shaSum.digest('hex')},function(err, doc) {
	    callback(null!=doc);
	});
    };

    var register = function(email, password, firstName, lastName) {
	var shaSum = crypto.createHash('sha256');
	shaSum.update(password);

	console.log('Registering ' + email);
	var user = new Account({
	    email: email,
	    name: {
		first: firstName,
		last: last
	    },
	    password: shaSum.digest('hex');
	});
	user.save(registerCallback);
	console.log('Save command was sent');
    }

    return {
	register: register,
	forgotPassword: forgotPassword,
	changePassword: changePassword,
	login: login,
	Account: Account
    }
}
