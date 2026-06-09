import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bot, Send, Sparkles, MapPin, Calendar, BookOpen, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Calendar, label: "Today's Schedule", prompt: "What's my schedule for today?" },
  { icon: MapPin, label: "Where to Go", prompt: "Where can I submit my grade statement request?" },
  { icon: BookOpen, label: "Next Class", prompt: "When and where is my next class?" },
  { icon: Bell, label: "Notifications", prompt: "Do I have any important notifications?" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Campus Guide. I can help you with schedules, directions, university services, events, and more. What would you like to know?",
    timestamp: new Date(),
  },
];

interface AIAssistantProps {
  className?: string;
  expanded?: boolean;
}

export function AIAssistant({ className, expanded = false }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        schedule: "📅 Here's your schedule for today:\n\n• 09:00 - Data Structures (CS-201)\n• 11:00 - Calculus II (MATH-105)\n• 14:00 - Physics Lab (PHY-LAB-3)\n• 16:00 - English Literature (HUM-302)\n\nYou have 4 classes today. Your first class starts in about 30 minutes!",
        where: "📍 To submit a grade statement request:\n\n1. Go to the **Student Services Building** (Building B)\n2. Head to the **Registrar's Office** on the 2nd floor\n3. Submit your request at Counter 3\n\nAlternatively, you can submit it online through the Smart Requests section in your portal!",
        class: "📚 Your next class is **Calculus II**\n\n• Time: 11:00 AM\n• Room: MATH-105 (Mathematics Building, 1st floor)\n• Professor: Prof. Gamal\n\nThe class starts in 45 minutes. Would you like directions?",
        notification: "🔔 You have 3 notifications:\n\n1. **Event Reminder**: Tech Hackathon registration closes tomorrow\n2. **Grade Posted**: Data Structures midterm grade is now available\n3. **Payment Due**: Library fine of $5.00 pending\n\nWould you like details on any of these?",
      };

      let response = "I understand you're asking about that. Let me help you! You can find more information in the relevant section of your portal, or I can guide you to the right office. What specific details do you need?";

      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes("schedule") || lowerMessage.includes("today")) {
        response = responses.schedule;
      } else if (lowerMessage.includes("where") || lowerMessage.includes("submit") || lowerMessage.includes("go")) {
        response = responses.where;
      } else if (lowerMessage.includes("next") || lowerMessage.includes("class")) {
        response = responses.class;
      } else if (lowerMessage.includes("notification") || lowerMessage.includes("alert")) {
        response = responses.notification;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt);
  };

  if (!expanded) {
    return (
      <Card variant="glass" className={cn("p-4", className)}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Campus Guide</h3>
            <p className="text-xs text-muted-foreground">Ask me anything</p>
          </div>
          <Badge variant="glass" className="ml-auto gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask about classes, directions, events..."
            className="flex-1 h-10 px-4 rounded-xl bg-surface-2 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button size="icon" variant="default" onClick={() => handleSend(input)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" className={cn("flex flex-col h-[500px]", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">AI Campus Guide</h3>
          <p className="text-xs text-muted-foreground">Your personal university assistant</p>
        </div>
        <Badge variant="active" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Online
        </Badge>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 p-4 overflow-x-auto border-b border-border">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="glass"
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() => handleQuickAction(action.prompt)}
            >
              <Icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/20"
              )}
            >
              {message.role === "user" ? (
                <span className="text-sm font-medium">A</span>
              ) : (
                <Bot className="h-4 w-4 text-primary" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2"
              )}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-surface-2 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your message..."
            className="flex-1 h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button size="icon" variant="default" className="h-11 w-11" onClick={() => handleSend(input)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
