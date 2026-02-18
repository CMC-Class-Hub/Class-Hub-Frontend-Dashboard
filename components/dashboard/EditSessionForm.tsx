"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeSelector } from "@/components/ui/TimeSelector";
import type { SessionResponse } from "@/lib/api";
import { formatTime12h } from "@/lib/utils";

interface Errors {
    date?: string;
    startTime?: string;
    endTime?: string;
    capacity?: string;
    price?: string;
}

interface EditSessionFormProps {
    session: SessionResponse;
    onSubmit: (data: { date: string; startTime: string; endTime: string; capacity: number; price: number }) => void;
    onCancel: () => void;
}

export function EditSessionForm({ session, onSubmit, onCancel }: EditSessionFormProps) {
    const [date, setDate] = useState(session.date ? session.date.toISOString().split('T')[0] : '');
    // Convert LocalTime object to HH:mm string
    const formatTimeObj = (time: any) => {
        if (!time) return '';
        if (typeof time === 'string') {
            const parts = time.split(':');
            return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : time;
        }
        const h = String(time.hour ?? 0).padStart(2, '0');
        const m = String(time.minute ?? 0).padStart(2, '0');
        return `${h}:${m}`;
    };

    const [startTime, setStartTime] = useState(formatTimeObj(session.startTime));
    const [endTime, setEndTime] = useState(formatTimeObj(session.endTime));
    const [capacity, setCapacity] = useState<number | ''>(session.capacity || '');
    const [price, setPrice] = useState<number | ''>(session.price ?? '');
    const [errors, setErrors] = useState<Errors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Errors = {};

        if (!date) {
            newErrors.date = '날짜를 선택해주세요.';
        }
        if (!startTime) {
            newErrors.startTime = '시작 시간을 입력해주세요.';
        }
        if (!endTime) {
            newErrors.endTime = '종료 시간을 입력해주세요.';
        }
        if (capacity === '' || capacity <= 0) {
            newErrors.capacity = '정원을 입력해주세요.';
        }
        if (price === '') {
            newErrors.price = '가격을 입력해주세요.';
        }

        if (startTime && endTime && startTime > endTime) {
            newErrors.startTime = '시작 시간은 종료 시간보다 빨라야 합니다.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        onSubmit({ date, startTime, endTime, capacity: Number(capacity), price: Number(price) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>날짜 *</Label>
                <Input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                        setDate(e.target.value);
                        if (errors.date) setErrors({ ...errors, date: undefined });
                    }}
                />
                {errors.date && (
                    <p className="text-xs text-[#F04452] font-medium">{errors.date}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>시작 시간 *</Label>
                    <TimeSelector
                        value={startTime}
                        onChange={(value) => {
                            setStartTime(value);
                            if (errors.startTime) setErrors({ ...errors, startTime: undefined });
                        }}
                    />
                    {errors.startTime && (
                        <p className="text-xs text-[#F04452] font-medium">{errors.startTime}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>종료 시간 *</Label>
                    <TimeSelector
                        value={endTime}
                        minTime={startTime}
                        onChange={(value) => {
                            setEndTime(value);
                            if (errors.endTime) setErrors({ ...errors, endTime: undefined });
                        }}
                    />
                    {errors.endTime && (
                        <p className="text-xs text-[#F04452] font-medium">{errors.endTime}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>정원 *</Label>
                    <Input
                        type="number"
                        value={capacity}
                        min="0"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCapacity(value === "" ? '' : Number(value));
                            if (errors.capacity) setErrors({ ...errors, capacity: undefined });
                        }}
                        placeholder="10"
                    />
                    {errors.capacity && (
                        <p className="text-xs text-[#F04452] font-medium">{errors.capacity}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>가격 *</Label>
                    <Input
                        type="number"
                        value={price}
                        min="0"
                        onChange={(e) => {
                            const value = e.target.value;
                            setPrice(value === "" ? '' : Number(value));
                            if (errors.price) setErrors({ ...errors, price: undefined });
                        }}
                        placeholder="50000"
                    />
                    {errors.price && (
                        <p className="text-xs text-[#F04452] font-medium">{errors.price}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                    취소
                </Button>
                <Button type="submit" className="flex-1">
                    수정 저장
                </Button>
            </div>
        </form>
    );
}
