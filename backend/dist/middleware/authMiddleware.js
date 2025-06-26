"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('[protect] Raw token:', token); // Debug
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            console.log('[protect] Decoded JWT:', decoded); // Debug
            // Attach user to the request (optional, but useful for authorization)
            const user = await User_1.default.findById(decoded.id).select('-password');
            console.log('[protect] User found:', user); // Debug
            req.user = user;
            next();
        }
        catch (error) {
            console.error('[protect] JWT verification error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        console.error('[protect] No token found in Authorization header');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
