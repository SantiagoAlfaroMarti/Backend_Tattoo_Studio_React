"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.port || 5000;
app.get('/healthy', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});
app.listen(PORT, () => {
    console.log('Server is running.');
});