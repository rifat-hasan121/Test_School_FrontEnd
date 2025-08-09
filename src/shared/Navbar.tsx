import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout, loading } = useContext(AuthContext); // user & logOut ফাংশন

  if (loading) {
    return <div className="text-center py-4">Loading...</div>; // লোডিং স্টেট দেখানোর জন্য
  }

  const handleLogout = () => {
    logout()
      .then(() => console.log("Logged out"))
      .catch((err: any) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-indigo-600">
              TestSchool
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>

            {!user ? (
              <>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} // default image if no photoURL
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md border"
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>

          {!user ? (
            <>
              <a
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </a>
            </>
          ) : (
            <div className="flex items-center space-x-4 px-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
 