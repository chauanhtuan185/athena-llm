import OpenAI from "openai";
import type { Message, StructuredMessage } from "../types/message";

export interface SendMessageOptions {
  messages: Message[];
  maxTokens?: number;
}

export async function sendMessage({
  messages,
  maxTokens = 3000,
}: SendMessageOptions): Promise<StructuredMessage> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
  console.log(messages)
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    tools: [
      {
        type: "function",
        function: {
          name: "approveTransfer",
          description:
            "Approve the money transfer request and provide explanation",
          parameters: {
            type: "object",
            properties: {
              explanation: {
                type: "string",
                description:
                  "Explanation for why the money transfer is approved",
              },
            },
            required: ["explanation"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "rejectTransfer",
          description:
            "Reject the money transfer request and provide explanation",
          parameters: {
            type: "object",
            properties: {
              explanation: {
                type: "string",
                description:
                  "Explanation for why the money transfer is rejected",
              },
            },
            required: ["explanation"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const toolCall = completion.choices[0].message.tool_calls?.[0];

  if (!toolCall) {
    console.log("No tool call", completion.choices[0].message.content);
    return {
      explanation: completion.choices[0].message.content || "Transfer rejected",
      decision: false,
    };
  }

  const args = JSON.parse(toolCall.function.arguments);
  console.log("Tool call", toolCall.function.name, args);

  return {
    explanation: args.explanation,
    decision: toolCall.function.name === "approveTransfer",
  };
}
