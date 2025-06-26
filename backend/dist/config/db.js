"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        //const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-db');
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
exports.default = connectDB;
