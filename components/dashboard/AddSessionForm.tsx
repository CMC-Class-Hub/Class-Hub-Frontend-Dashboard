"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Errors {
    date?: string;
    startTime?: string;
    endTime?: string;
    capacity?: string;
    price?: string;
}

export function AddSessionForm({ onSubmit }: {
    onSubmit: (data: { date: string; startTime: string; endTime: string; capacity: number; price: number }) => void;
}) {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [price, setPrice] = useState<number | ''>('');
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
                    <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            if (errors.startTime) setErrors({ ...errors, startTime: undefined });
                        }}
                    />
                    {errors.startTime && (
                        <p className="text-xs text-[#F04452] font-medium">{errors.startTime}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>종료 시간 *</Label>
                    <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                            setEndTime(e.target.value);
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

            <Button type="submit" className="w-full">세션 생성</Button>
        </form>
    );
}
