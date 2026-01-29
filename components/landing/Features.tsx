"use client";

import { Calendar, MessageSquare, Users, CheckCircle2 } from 'lucide-react';

const features = [
    {
        icon: <Calendar className="w-8 h-8 text-[#3182F6]" />,
        title: "간편한 일정 관리",
        description: "한 눈에 들어오는 캘린더로 수업 일정을 관리하세요. 새로운 클래스 개설도 몇 번의 클릭이면 충분합니다."
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-[#3182F6]" />,
        title: "자동 안내 문자",
        description: "수업 3일 전, 1일 전 안내 문자를 자동으로 발송합니다. 수강생이 놓치지 않도록 꼼꼼하게 챙겨주세요."
    },
    {
        icon: <Users className="w-8 h-8 text-[#3182F6]" />,
        title: "수강생 통합 관리",
        description: "신청자 명단 확인부터 노쇼, 환불 관리까지. 수강생 정보를 체계적으로 기록하고 관리할 수 있습니다."
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        왜 <span className="text-[#3182F6]">Class Hub</span>인가요?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        강사님의 소중한 시간을 아껴드리는 핵심 기능들을 소개합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-[#F9FAFB] hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                            <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm inline-block group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#1B64DA] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-6">지금 바로 시작해보세요</h3>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                            초기 설정 비용 0원, 월 비용 0원. <br />
                            베타 기간 동안 모든 기능을 무료로 이용하실 수 있습니다.
                        </p>
                        <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-4 text-sm font-medium text-blue-100">
                            <li className="flex items-center justify-center"><CheckCircle2 className="w-5 h-5 mr-2 text-white" /> 무제한 클래스 생성</li>
                            <li className="flex items-center justify-center"><CheckCircle2 className="w-5 h-5 mr-2 text-white" /> 무제한 수강생 관리</li>
                            <li className="flex items-center justify-center"><CheckCircle2 className="w-5 h-5 mr-2 text-white" /> 문자 발송 무료</li>
                        </ul>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    );
}
