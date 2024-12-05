import express, { Request, Response } from "express";
import { sendMessage } from "../services/openaiService";

const handler = express.Router();

handler.post("/process", async (req: Request, res: Response): Promise<any>=> {
   try {
    // Lấy dữ liệu từ body
    const { messages, maxTokens } = req.body;

    // // Kiểm tra tính hợp lệ
    // if (!messages || !Array.isArray(messages)) {
    //   return res.status(400).json({ error: "'messages' phải là một mảng." });
    // }

    // Gọi hàm xử lý logic của bạn
    const response = await sendMessage({ messages, maxTokens });

    // Trả về kết quả
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
});

export default handler;
