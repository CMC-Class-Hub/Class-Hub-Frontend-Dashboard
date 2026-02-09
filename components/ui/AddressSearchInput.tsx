"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';

// @ts-ignore
const DaumPostcode = dynamic(() => import('react-daum-postcode'), { ssr: false }) as any;

interface AddressSearchInputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function AddressSearchInput({
    value,
    onChange,
    placeholder = "주소 검색",
    disabled,
    className,
}: AddressSearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        onChange(fullAddress);
        setIsOpen(false);
    };

    return (
        <div className="flex w-full gap-2">
            <Input
                value={value}
                readOnly
                placeholder={placeholder}
                disabled={disabled}
                className={`flex-1 cursor-pointer ${className}`}
                onClick={() => !disabled && setIsOpen(true)}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button type="button" variant="outline" disabled={disabled}>
                        <Search className="h-4 w-4 mr-2" />
                        검색
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
                    <DialogHeader className="p-4 pb-0">
                        <DialogTitle>주소 검색</DialogTitle>
                    </DialogHeader>
                    <div className="h-[500px] w-full p-4">
                        <DaumPostcode onComplete={handleComplete} style={{ height: '100%' }} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
