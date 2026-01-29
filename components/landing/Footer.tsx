"use client";

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-[#3182F6] mb-4 inline-block">
                            Class Hub
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            강사를 위한 올인원 클래스 관리 솔루션.<br />
                            더 나은 교육 환경을 만들기 위해 노력합니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="#features" className="hover:text-[#3182F6]">기능 소개</Link></li>
                            <li><Link href="#pricing" className="hover:text-[#3182F6]">요금제</Link></li>
                            <li><Link href="/login" className="hover:text-[#3182F6]">로그인</Link></li>
                            <li><Link href="/signup" className="hover:text-[#3182F6]">회원가입</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">문의</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>contact@classhub.site</li>
                            <li>02-1234-5678</li>
                            <li className="text-gray-400 mt-4">© 2026 Class Hub.<br />All rights reserved.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
