'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ClassPreview, ClassDetailResponse } from '../preview/ClassPreview';

interface PreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    previewData: ClassDetailResponse;
}

export function PreviewDialog({ isOpen, onClose, previewData }: PreviewDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 100 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            // Position to the right: (create width 672px + gap 32px) / 2 = 352px
                            x: 352
                        }}
                        exit={{ opacity: 0, scale: 0.95, x: 100 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300
                        }}
                        className="relative w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header - Toss Style */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 z-10 px-5 py-4 shrink-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl">👀</span>
                                        <h2 className="text-lg font-bold text-[#191F28]">신청 화면 미리보기</h2>
                                    </div>
                                    <p className="text-sm text-[#6B7684] leading-relaxed">
                                        수강생에게 보여질 화면이에요. 자세히 작성할수록 문의가 줄어요.
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
                                    }}
                                    className="p-2 rounded-xl hover:bg-white/60 transition-colors shrink-0"
                                    aria-label="닫기"
                                >
                                    <X className="w-5 h-5 text-[#6B7684]" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-h-0 overflow-y-auto bg-[#F2F4F6]">
                            <div className="bg-white">
                                <ClassPreview classDetail={previewData} showHeader={true} />
                            </div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute bottom-6 right-6 text-gray-300 text-xs font-bold opacity-50 pointer-events-none">
                            미리보기
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
