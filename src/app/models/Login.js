const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;


const Login = new Schema({
    username: {type: String, require: true},
    email: { type: String, default: '', require: true},
    password: { type: String, default: '', require: true},

    loginAt: { type: Date, default: Date.now},
    logoutAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    
}, { collection: 'login' });

Login.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
Login.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('Login', Login)