import {Types} from 'mongoose';

export default interface User {
    _id?: Types.ObjectId;
    _username?: string;
    email?: string;
    password?: string;
    validatePassword(formPassword: string):boolean

}