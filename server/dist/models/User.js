import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;
const { hash, compare } = bcrypt;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'Your username must be at least 2 character in length']
    },
    email: {
        type: String,
        // The unique rule only works when the collection is first created
        // You cannot create a custom error message with the array syntax on the unique rule
        unique: true,
        // Ensure the value is a valid email string
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        // Ensure the string is at least 6 chars long
        minLength: [6, 'Your password must be at least 6 characters in length']
    },
    pets: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }]
}, {
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;
            return user;
        }
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        user.password = await hash(user.password, 10);
    }
    next();
});
userSchema.methods.validatePassword = async function (formPassword) {
    return await compare(formPassword, this.password);
};
const User = model('User', userSchema);
export default User;
