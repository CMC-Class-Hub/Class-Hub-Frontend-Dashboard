"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await api.auth.isLoggedIn();
      if (isLoggedIn) {
        const user = await api.auth.getCurrentUser();
        if (user?.role === 'admin') {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 간단한 유효성 검사
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      await api.auth.login({ email, password });
      if (email === 'admin@admin.admin') {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] p-4 sm:p-6">
      <Card className="w-full max-w-[420px] p-2 sm:p-4">
        <CardHeader className="text-center pb-2">
          <Link href="/" className="inline-block">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-[#3182F6] cursor-pointer hover:opacity-80 transition-opacity">
              Class Hub
            </CardTitle>
          </Link>
          <CardDescription className="text-sm sm:text-base mt-2 text-[#6B7684]">
            강사 대시보드에 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-[#FFEBEE] text-[#F04452] text-sm font-medium">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#6B7684]">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="text-[#3182F6] hover:underline font-semibold">
                회원가입
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
