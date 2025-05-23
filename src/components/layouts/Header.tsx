import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LogOut, MessageSquare, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

export default function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };

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
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Log out</span>
          </Button>
          {/* <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Messages</span>
            <Badge variant="secondary" className="ml-1">
              2
            </Badge>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </Button> */}
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" /> */}
              <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.email}</p>
              {/* <p className="text-xs text-muted-foreground">
                  Mathematics Teacher
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
