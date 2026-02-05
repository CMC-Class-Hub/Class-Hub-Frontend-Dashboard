"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await api.auth.getCurrentUser();
            if (user) {
                setName(user.name ?? '');

                setEmail(user.email);
                setPhone(user.phoneNumber || '');
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 실제 업데이트 로직 구현 필요 (여기서는 alert만 표시)
        alert('정보가 수정되었습니다. (구현 필요)');
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#191F28]">정보 수정</h1>
                <p className="text-sm md:text-base text-[#8B95A1] mt-1">계정 정보를 수정하세요</p>
            </div>

            <Card className="hover:shadow-md">
                <CardContent className="p-5 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="profile-name">이름</Label>
                            <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile-email">이메일</Label>
                            <Input id="profile-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile-phone">전화번호</Label>
                            <Input id="profile-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile-password">새 비밀번호</Label>
                            <Input id="profile-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="변경하려면 입력하세요" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile-confirm-password">비밀번호 확인</Label>
                            <Input id="profile-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                        </div>
                        <Button type="submit" className="w-full" size="lg">저장</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
