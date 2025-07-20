import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

const UserHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold h-full flex items-center">
            {/* SkillFlow */}
            <img
              className="h-full object-contain" // Added h-full and object-contain
              style={{ maxHeight: "50px", width: "auto" }}
              src="https://res.cloudinary.com/dsvllb1am/image/upload/v1750778951/xanh_k4vpgg.png"
              alt="Girl in a jacket"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/" className="text-sm font-medium">
              Tutors
            </Link>
            <Link to="/" className="text-sm font-medium">
              Blog
            </Link>
            <Link to="/contacts" className="text-sm font-medium">
              Contacts
            </Link>
            {/* <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/teachers" className="text-sm font-medium">
              Find Teachers
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium">
              How It Works
            </Link> */}
            {/* <Link to="/pricing" className="text-sm font-medium">
                Pricing
              </Link> */}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex gap-2"
              >
                <Calendar className="h-4 w-4" />
                Dashboard
              </Button>
            </Link> */}
          {user ? (
            <>
              <Link to="/profile">{user.email}</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
