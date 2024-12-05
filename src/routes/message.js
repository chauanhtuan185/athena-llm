"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openaiService_1 = require("../services/openaiService");
const handler = express_1.default.Router();
handler.post("/process", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lấy dữ liệu từ body
        const { messages, maxTokens } = req.body;
        // // Kiểm tra tính hợp lệ
        // if (!messages || !Array.isArray(messages)) {
        //   return res.status(400).json({ error: "'messages' phải là một mảng." });
        // }
        // Gọi hàm xử lý logic của bạn
        const response = yield (0, openaiService_1.sendMessage)({ messages, maxTokens });
        // Trả về kết quả
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error" });
    }
}));
exports.default = handler;
