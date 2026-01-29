"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 유효성 검사
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      setError("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    try {
      // 회원가입
      await api.auth.signUp({ email, name, password, phoneNumber });
    } catch (err: any) {
      setError(err.message || "회원가입에 실패했습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // 자동 로그인
      await api.auth.login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      // 회원가입은 성공했지만 로그인 실패 시 로그인 페이지로
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] p-4 sm:p-6">
      <Card className="w-full max-w-[420px] p-2 sm:p-4">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-[#3182F6]">
            Class Hub
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2 text-[#6B7684]">
            강사 계정을 만들어보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="010-1234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 (4자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-[#FFEBEE] text-[#F04452] text-sm font-medium">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#6B7684]">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-[#3182F6] hover:underline font-semibold">
                로그인
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
