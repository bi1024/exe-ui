import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, Send, Paperclip, Phone, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage?: string;
  unreadCount: number;
  lastActive: Date;
  isOnline: boolean;
}

interface ChatInterfaceProps {
  conversations?: Conversation[];
  activeConversationId?: string;
  messages?: Message[];
  currentUserId?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversations = [
    {
      id: '1',
      participantId: 'teacher1',
      participantName: 'Sarah Johnson',
      participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Looking forward to our lesson tomorrow!',
      unreadCount: 2,
      lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isOnline: true,
    },
    {
      id: '2',
      participantId: 'teacher2',
      participantName: 'Michael Chen',
      participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      lastMessage: 'Please review the materials I sent',
      unreadCount: 0,
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isOnline: false,
    },
    {
      id: '3',
      participantId: 'teacher3',
      participantName: 'Emma Wilson',
      participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      lastMessage: 'Great progress today!',
      unreadCount: 0,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isOnline: true,
    },
  ],
  activeConversationId = '1',
  messages = [
    {
      id: 'm1',
      senderId: 'teacher1',
      content: 'Hello! How are you doing with the homework I assigned?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: 'm2',
      senderId: 'user1',
      content: "I've completed most of it, but I have a question about the third exercise.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
    {
      id: 'm3',
      senderId: 'teacher1',
      content: "Sure, what's your question?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      read: true,
    },
    {
      id: 'm4',
      senderId: 'user1',
      content: "I'm not sure how to approach the problem. Could we go over it in our next lesson?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      read: true,
    },
    {
      id: 'm5',
      senderId: 'teacher1',
      content: 'Absolutely! We can start with that in our session tomorrow. Looking forward to our lesson!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
  ],
  currentUserId = 'user1',
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string>(activeConversationId);

  const activeConversation = conversations.find(conv => conv.id === selectedConversation);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[600px] w-full flex-col bg-background rounded-lg border">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <Tabs defaultValue="all">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[calc(600px-110px)]">
                <div className="p-2">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-accent ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                          <AvatarFallback>{conversation.participantName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastActive)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="rounded-full h-5 min-w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <ScrollArea className="h-[calc(600px-110px)]">
                <div className="p-2">
                  {conversations.filter(c => c.unreadCount > 0).map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-accent ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                          <AvatarFallback>{conversation.participantName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastActive)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      <Badge variant="destructive" className="rounded-full h-5 min-w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConversation.participantAvatar} alt={activeConversation.participantName} />
                    <AvatarFallback>{activeConversation.participantName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.participantName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.isOnline ? 'Online' : 'Last seen ' + formatTime(activeConversation.lastActive)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUserId;
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}
                        >
                          <p>{message.content}</p>
                          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} flex justify-end`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Card className="w-[300px]">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-sm text-muted-foreground mt-2">Select a conversation from the sidebar to start chatting</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
