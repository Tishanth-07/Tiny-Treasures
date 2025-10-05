"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { clearAuthToken } from "@/utils/auth-utils/api";
import { toast } from "react-hot-toast";
// import { useUserContext } from "@/context/UserContext"; // if you're using one

const LogoutButton = () => {
  const router = useRouter();
  // const { setUser } = useUserContext(); // optional context clearing

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try { clearAuthToken(); } catch {}
    // setUser(null); // optional: clear context
    toast.success("✅ Logged out successfully!");
    // Use NextAuth signOut to clear session and redirect
    signOut({ callbackUrl: "/authentication/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

