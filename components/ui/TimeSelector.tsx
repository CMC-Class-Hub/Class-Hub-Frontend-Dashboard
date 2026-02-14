"use client";

import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TimeSelectorProps {
    value?: string; // "HH:MM" 24시간 형식
    onChange: (value: string) => void;
    placeholder?: string;
    minTime?: string; // "HH:MM" 24시간 형식
}

// 시간 옵션 (1-12)
const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
// 분 옵션 (5분 단위)
const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

export function TimeSelector({ value, onChange, placeholder = "시간 선택", minTime }: TimeSelectorProps) {
    const parseValue = (val: string | undefined) => {
        if (!val) return { meridiem: 'AM' as const, hour: '', minute: '' };
        const [h, m] = val.split(':');
        const hourNum = parseInt(h);
        if (isNaN(hourNum)) return { meridiem: 'AM' as const, hour: '', minute: '' };

        let newMeridiem: 'AM' | 'PM' = 'AM';
        let newHour = '';

        if (hourNum === 0) {
            newMeridiem = 'AM';
            newHour = '12';
        } else if (hourNum === 12) {
            newMeridiem = 'PM';
            newHour = '12';
        } else if (hourNum > 12) {
            newMeridiem = 'PM';
            newHour = (hourNum - 12).toString();
        } else {
            newMeridiem = 'AM';
            newHour = hourNum.toString();
        }

        return { meridiem: newMeridiem, hour: newHour, minute: m ? m.padStart(2, '0') : '' };
    };

    const initial = parseValue(value);
    const [meridiem, setMeridiem] = useState<'AM' | 'PM'>(initial.meridiem);
    const [hour, setHour] = useState(initial.hour);
    const [minute, setMinute] = useState(initial.minute);

    // value가 변경되면 파싱 (부모에서 변경시 동기화)
    useEffect(() => {
        const parsed = parseValue(value);
        setMeridiem(parsed.meridiem);
        setHour(parsed.hour);
        setMinute(parsed.minute);
    }, [value]);

    // minTime 파싱
    let minHour24 = -1;
    let minMinuteVal = -1;
    if (minTime) {
        const [h, m] = minTime.split(':').map(Number);
        if (!isNaN(h) && !isNaN(m)) {
            minHour24 = h;
            minMinuteVal = m;
        }
    }

    // 값이 변경될 때마다 부모에게 알림
    const updateValue = (newMeridiem: 'AM' | 'PM', newHour: string, newMinute: string) => {
        if (newHour && newMinute) {
            let hour24 = parseInt(newHour);
            if (newMeridiem === 'AM') {
                if (hour24 === 12) hour24 = 0;
            } else {
                if (hour24 !== 12) hour24 += 12;
            }
            const timeStr = `${hour24.toString().padStart(2, '0')}:${newMinute}`;
            onChange(timeStr);
        }
    };

    const handleMeridiemChange = (newMeridiem: 'AM' | 'PM') => {
        setMeridiem(newMeridiem);
        updateValue(newMeridiem, hour, minute);
    };

    const handleHourChange = (newHour: string) => {
        setHour(newHour);

        let newMinute = minute;
        // 분이 선택되지 않았을 경우, 첫 번째 유효한 분을 자동으로 선택 (보통 00분)
        if (!newMinute) {
            const h24 = get24Hour(newHour, meridiem);

            const firstValid = minuteOptions.find(m => {
                const mVal = parseInt(m);
                // 유효성 검사 로직 (disabled 조건과 동일) - 이상의 개념으로 변경 (mVal < minMinuteVal)
                const isDisabled = minHour24 !== -1 && h24 === minHour24 && mVal < minMinuteVal;
                const isTimeInvalid = minHour24 !== -1 && h24 < minHour24;
                return !isDisabled && !isTimeInvalid;
            });

            if (firstValid) {
                newMinute = firstValid;
                setMinute(newMinute);
            }
        }

        updateValue(meridiem, newHour, newMinute);
    };

    const handleMinuteChange = (newMinute: string) => {
        setMinute(newMinute);
        updateValue(meridiem, hour, newMinute);
    };

    // Helper: 12시간제 + AM/PM -> 24시간제 변환
    const get24Hour = (h: string, m: 'AM' | 'PM') => {
        let val = parseInt(h);
        if (isNaN(val)) return -1;
        if (m === 'AM') return val === 12 ? 0 : val;
        return val === 12 ? 12 : val + 12;
    };

    // AM/PM 비활성화 여부
    const isAmDisabled = minHour24 >= 12; // 12시(오후 12시) 이상이면 오전 선택 불가

    return (
        <div className={cn(
            "flex items-center h-12 w-full rounded-2xl border-0 bg-[#F2F4F6] px-4 text-base text-[#191F28] transition-all duration-200",
            "focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]"
        )}>
            {/* AM/PM Select */}
            <Select value={meridiem} onValueChange={(val) => handleMeridiemChange(val as 'AM' | 'PM')}>
                <SelectTrigger
                    className="w-[3.2rem] h-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-0 justify-center font-medium text-[#191F28] hover:text-[#3182F6]"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AM" className="justify-center" disabled={isAmDisabled}>오전</SelectItem>
                    <SelectItem value="PM" className="justify-center">오후</SelectItem>
                </SelectContent>
            </Select>

            {/* Separator */}
            <div className="w-[1px] h-3 bg-[#D1D5DB] mx-2" />

            {/* Hour Select */}
            <Select value={hour} onValueChange={handleHourChange}>
                <SelectTrigger
                    className="flex-1 border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-0 h-full text-center justify-center font-normal text-[#191F28]"
                >
                    <SelectValue placeholder="00" />
                </SelectTrigger>
                <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                    {hourOptions.map(h => {
                        const h24 = get24Hour(h, meridiem);
                        const isDisabled = minHour24 !== -1 && h24 < minHour24;
                        return (
                            <SelectItem key={h} value={h} className="justify-center" disabled={isDisabled}>
                                {h}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>

            <span className="text-[#191F28] pb-0.5 px-1 font-medium">:</span>

            {/* Minute Select */}
            <Select value={minute} onValueChange={handleMinuteChange}>
                <SelectTrigger
                    className="flex-1 border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-0 h-full text-center justify-center font-normal text-[#191F28]"
                >
                    <SelectValue placeholder="00" />
                </SelectTrigger>
                <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                    {minuteOptions.map(m => {
                        const h24 = get24Hour(hour, meridiem);
                        const mVal = parseInt(m);
                        // 현재 시간이 minHour와 같으면, 분을 비교. minHour보다 전이면 이미 시간 선택 불가지만 안전장치.
                        // minHour24와 h24가 같을 때만 분 제한. h24 < minHour24인 경우는 시간 선택에서 막힘.
                        // 이상의 개념으로 변경 (mVal < minMinuteVal)
                        const isDisabled = minHour24 !== -1 && h24 === minHour24 && mVal < minMinuteVal;
                        // 만약 시간이 minHour보다 작다면 분도 선택 불가 (이론상 시간선택에서 막히지만)
                        const isTimeInvalid = minHour24 !== -1 && h24 < minHour24;

                        return (
                            <SelectItem key={m} value={m} className="justify-center" disabled={isDisabled || isTimeInvalid}>
                                {m}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
