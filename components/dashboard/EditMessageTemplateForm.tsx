"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messageTemplateApi, type MessageTemplateType } from "@/lib/api";

export const EditMessageTemplateForm = ({
    type,
    initialContent,
    onSave,
    onCancel
}: {
    type: MessageTemplateType;
    initialContent: string;
    onSave: (content: string) => Promise<void>;
    onCancel: () => void;
}) => {
    const [content, setContent] = useState(initialContent);

    const handleInsertVariable = (variable: string) => {
        setContent(prev => prev + variable);
    };

    const handleResetToDefault = () => {
        if (confirm('기본 문구로 복구하시겠습니까? 현재 입력된 내용이 사라집니다.')) {
            const defaultContent = messageTemplateApi.getDefault(type, '{클래스명}');
            setContent(defaultContent);
        }
    };

    return (
        <>
            {/* 변수 입력 도우미 */}
            <div className="mb-4 p-4 bg-[#E8F3FF] rounded-2xl">
                <p className="text-xs text-[#3182F6] font-semibold mb-3">아래 버튼을 누르면 내용에 자동으로 들어갑니다</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    {['{수강생명}', '{클래스명}', '{날짜}', '{시간}', '{장소}', '{준비물}', '{주차}', '{클래스링크}'].map((variable) => (
                        <button
                            key={variable}
                            type="button"
                            onClick={() => handleInsertVariable(variable)}
                            className="px-3 py-1.5 bg-white rounded-xl text-[#3182F6] font-medium hover:bg-[#F2F4F6] transition-all shadow-sm active:scale-95"
                        >
                            {variable}
                        </button>
                    ))}
                </div>
            </div>

            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="메시지 내용을 입력하세요. {클래스명}, {날짜}, {시간} 등의 변수를 사용할 수 있습니다."
                className="mb-4 text-sm"
                autoFocus
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button
                    variant="ghost"
                    type="button"
                    onClick={onCancel}
                    className="order-3 sm:order-1"
                >
                    취소
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    onClick={handleResetToDefault}
                    className="order-2"
                >
                    기본 문구로 복구
                </Button>
                <Button
                    type="button"
                    onClick={() => onSave(content)}
                    className="order-1 sm:order-3"
                >
                    저장
                </Button>
            </div>
        </>
    );
}
