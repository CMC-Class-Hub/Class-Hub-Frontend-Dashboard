"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddSessionForm({ onSubmit }: {
    onSubmit: (data: { date: string; startTime: string; endTime: string; capacity: number; price: number }) => void;
}) {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState(10);
    const [price, setPrice] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ date, startTime, endTime, capacity, price });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>날짜 *</Label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>시작 시간 *</Label>
                    <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>종료 시간 *</Label>
                    <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>정원 *</Label>
                    <Input
                        type="number"
                        min="1"
                        value={capacity}
                        onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>가격 *</Label>
                    <Input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                        required
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">세션 생성</Button>
        </form>
    );
}
