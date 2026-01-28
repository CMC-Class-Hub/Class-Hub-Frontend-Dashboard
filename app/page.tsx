"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인 후 적절한 페이지로 리다이렉트
    if (isLoggedIn()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F4F6]">
      <h1 className="text-3xl font-bold text-[#3182F6] mb-6">
        Class Hub
      </h1>
      <div className="w-10 h-10 border-4 border-[#E5E8EB] border-t-[#3182F6] rounded-full animate-spin mb-4"></div>
      <p className="text-[#8B95A1] font-medium">로딩 중...</p>
    </div>
  );
}
