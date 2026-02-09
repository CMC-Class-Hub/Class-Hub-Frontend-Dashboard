"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';
import { api } from '@/lib/api';

export function Hero() {
    const router = useRouter();

    const handleDemoLogin = async () => {
        try {
            await api.auth.login({ email: 'demo@classhub.com', password: '1234' });
            router.push('/dashboard');
        } catch (error) {
            alert('데모 로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#3182F6] text-sm font-semibold mb-6 animate-fade-in-up">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span>강사를 위한 최고의 파트너</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                    클래스 운영의 모든 것,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3182F6] to-[#00B8D9]">Class Hub</span> 하나로.
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed font-normal">
                    수강생 모집부터 일정 관리, 자동 알림 발송까지.<br className="hidden sm:block" />
                    복잡한 반복 업무는 저희에게 맡기고, 오직 수업에만 집중하세요.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" className="w-full sm:w-60 text-lg h-14 px-8 bg-[#3182F6] hover:bg-[#1B64DA] text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 rounded-full font-bold">
                            클래스허브 시작하기
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleDemoLogin}
                        className="w-full sm:w-60 text-lg h-14 px-8 border-[#3182F6] text-[#3182F6] hover:bg-blue-50 rounded-full font-bold border-2"
                    >
                        데모 체험하기
                    </Button>
                </div>
            </div>

            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-sky-200/30 rounded-full blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
}
