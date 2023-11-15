const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, require: true},
    email: { type: String, default: '', require: true},
    password: {type: String, require: true},
    phone: { type: String, default: ''},
    fullname: { type: String, default: ''},
    roles: {type: Array, default: []},
    status: { type: String, default: 'noactive'},
    type_regis: { type: String, default: 'WE'},

    deleteAt: { type: Date, default: Date.now},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    
}, { collection: 'users' })
User.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
User.index({ email: 1}) //Nơi đánh dấu primary key và liên kết nó với Login
module.exports = mongoose.model('User', User)
