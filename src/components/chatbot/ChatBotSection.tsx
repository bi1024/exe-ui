import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import apiClient from "@/api/apiClient";
import { Link } from "react-router-dom";

const ChatBotSection = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);

  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (replace with actual API call)
    const body = {
      prompt: input,
    };
    const result = await apiClient.post("/chatbot/general", body);
    console.log(result);
    const data = await result.data.responseText;
    console.log(data);

    setMessages((prev) => [...prev, { role: "bot", content: data }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          {user?.email ? (
            <Button
              size="icon"
              className="rounded-full shadow-lg bg-primary text-white hover:bg-primary/90"
              onClick={() => {
                // Example: open chat modal or redirect
                console.log("Clicked action button!");
              }}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          ) : (
            ""
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Card className="max-w-xl mx-auto mt-10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                SkillFlow Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="h-64 overflow-y-auto space-y-2 pr-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    ></div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatBotSection;
