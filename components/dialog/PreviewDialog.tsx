'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ClassPreview, ClassDetailResponse } from '../preview/ClassPreview';
import { useState, useEffect } from 'react';
import { Dialog, DialogPortal } from '../ui/dialog';

interface PreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    previewData: ClassDetailResponse;
}

export function PreviewDialog({ isOpen, onClose, previewData }: PreviewDialogProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal={false}>
            <AnimatePresence>
                {isOpen && (
                    <DialogPortal>
                        {/* 
                            pointer-events-none on backdrop container to allow clicking "under" it 
                            (like the main dialog) while keeping preview interactive via pointer-events-auto 
                        */}
                        <div
                            className="fixed inset-0 flex items-center justify-center p-4 z-[80] pointer-events-none"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{
                                    type: 'spring',
                                    damping: 25,
                                    stiffness: 300
                                }}
                                className="relative w-full max-w-[512px] h-[85vh] md:h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                                style={{
                                    marginLeft: !isMobile ? '640px' : '0',
                                    transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header - Toss Style */}
                                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-6 py-5 shrink-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl">👀</span>
                                                <h2 className="text-lg font-bold text-[#191F28]">신청 화면 미리보기</h2>
                                            </div>
                                            <p className="text-sm text-[#6B7684] leading-relaxed">
                                                수강생에게 보여질 화면이에요.
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClose();
                                            }}
                                            className="p-2 -mr-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
                                            aria-label="닫기"
                                        >
                                            <X className="w-5 h-5 text-[#6B7684]" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content Area with Robust Scroll */}
                                <div className="flex-1 relative min-h-0 bg-[#F2F4F6]">
                                    <div className="absolute inset-0 overflow-y-auto overscroll-contain touch-pan-y scroll-smooth">
                                        <div className="bg-white min-h-full">
                                            <ClassPreview classDetail={previewData} showHeader={true} />
                                        </div>
                                    </div>
                                </div>

                                {/* Watermark */}
                                <div className="absolute bottom-6 right-6 text-gray-300 text-[10px] font-bold opacity-30 pointer-events-none select-none">
                                    PREVIEW MODE
                                </div>
                            </motion.div>
                        </div>
                    </DialogPortal>
                )}
            </AnimatePresence>
        </Dialog>
    );
}
