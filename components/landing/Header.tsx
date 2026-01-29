"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Menu, X } from 'lucide-react';

export function Header() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Hydration mismatch 방지를 위해 클라이언트 마운트 후 상태 업데이트
        const checkLogin = async () => {
            const loggedIn = await api.auth.isLoggedIn();
            setIsUserLoggedIn(loggedIn);
        };
        checkLogin();
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-bold text-[#3182F6]">
                            Class Hub
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link href="#features" className="text-gray-500 hover:text-[#3182F6] transition-colors font-medium">
                            기능 소개
                        </Link>
                        <Link href="#pricing" className="text-gray-500 hover:text-[#3182F6] transition-colors font-medium">
                            요금제
                        </Link>
                        <div className="flex items-center space-x-4 ml-4">
                            {isUserLoggedIn ? (
                                <Link href="/dashboard">
                                    <Button className="bg-[#3182F6] hover:bg-[#1B64DA] text-white">
                                        대시보드로 이동
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="text-gray-600 hover:text-[#3182F6]">
                                            로그인
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button className="bg-[#3182F6] hover:bg-[#1B64DA] text-white">
                                            무료로 시작하기
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-500 hover:text-gray-900 focus:outline-none"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-4 pb-6 space-y-3">
                        <Link
                            href="#features"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#3182F6] rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            기능 소개
                        </Link>
                        <Link
                            href="#pricing"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#3182F6] rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            요금제
                        </Link>
                        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                            {isUserLoggedIn ? (
                                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-[#3182F6] hover:bg-[#1B64DA] text-white">
                                        대시보드로 이동
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">
                                            로그인
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full bg-[#3182F6] hover:bg-[#1B64DA] text-white justify-center">
                                            무료로 시작하기
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
