import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MessageSquare, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            SkillFlow
          </Link>
          <span className="text-sm font-medium text-muted-foreground">
            Teacher Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Messages</span>
            <Badge variant="secondary" className="ml-1">
              2
            </Badge>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">
                Mathematics Teacher
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
