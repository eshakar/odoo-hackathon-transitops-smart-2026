'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Basic redirect logic on root
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-in");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center p-24 h-full text-white bg-[#0F111A]">
      <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
