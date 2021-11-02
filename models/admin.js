import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
})

const Admin = mongoose.model('Admin', adminSchema, 'admins');

export default Admin;