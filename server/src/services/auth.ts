import { Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const { verify, sign } = jwt;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}


interface AuthenticatedRequest extends Request {
  user?: any;
}

export function createToken(user_id: Types.ObjectId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return sign({ user_id: user_id }, process.env.JWT_SECRET);
}

export const authenticate = async ({ req, res }: { req: AuthenticatedRequest; res: Response }) => {
  const pet_token = req.cookies?.pet_token;

  if (pet_token) {
    try {

      if (!process.env.JWT_SECRET) {
        console.log('MUST ADD JWT_SECRET TO .env!');

        return {
          req: req,
          res: res
        }
      }

      const userData = verify(pet_token, process.env.JWT_SECRET);

      if (!userData || typeof userData === 'string') {
        return {
          req: req,
          res: res
        }
      }

      const user = await User.findById(userData.user_id);

      req.user = user;

    } catch (error) {
      console.log('JWT VERIFICATION ERROR', error);
    }
  }

  return {
    req: req,
    res: res
  };
}









