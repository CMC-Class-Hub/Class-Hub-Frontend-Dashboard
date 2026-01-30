"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { AddressSearchInput } from "@/components/ui/AddressSearchInput";

export function CreateClassForm({ onSubmit, onCancel }: {
    onSubmit: (data: {
        name: string;
        description: string;
        location: string;
        locationDetails: string;
        preparation: string;
        instructions: string;
        images?: string[];
        price?: number;
        parkingInfo?: string;
        cancellationPolicy?: string;
    }) => void;
    onCancel: () => void;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationDetails, setLocationDetails] = useState('');
    const [preparation, setPreparation] = useState('');
    const [instructions, setInstructions] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [parkingInfo, setParkingInfo] = useState('');
    const [cancellationPolicy, setCancellationPolicy] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            location,
            locationDetails,
            preparation,
            instructions,
            images,
            price,
            parkingInfo,
            cancellationPolicy,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>대표 이미지 (여러 장 선택 가능)</Label>
                <ImageUpload values={images} onChange={setImages} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="className">클래스명 *</Label>
                <Input
                    id="className"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 요가 초급 클래스"
                    required
                    autoFocus
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classDescription">소개글</Label>
                <Textarea
                    id="classDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="클래스에 대한 간단한 설명"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classPrice">1인 가격 (원)</Label>
                <Input
                    id="classPrice"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    placeholder="0"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classLocation">장소 *</Label>
                <AddressSearchInput
                    value={location}
                    onChange={setLocation}
                    placeholder="주소 검색 (클릭)"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classLocationDetails">위치 안내</Label>
                <Textarea
                    id="classLocationDetails"
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    placeholder="건물 입구, 주차 정보 등 상세 주소"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classParkingInfo">주차 안내</Label>
                <Textarea
                    id="classParkingInfo"
                    value={parkingInfo}
                    onChange={(e) => setParkingInfo(e.target.value)}
                    placeholder="주차 가능 여부 및 주차장 위치 안내"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classPreparation">준비물</Label>
                <Textarea
                    id="classPreparation"
                    value={preparation}
                    onChange={(e) => setPreparation(e.target.value)}
                    placeholder="예: 요가매트, 운동복, 물"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classInstructions">안내사항</Label>
                <Textarea
                    id="classInstructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="수강생에게 전달할 추가 안내사항"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="classCancellationPolicy">취소/환불 규정</Label>
                <Textarea
                    id="classCancellationPolicy"
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value)}
                    placeholder="취소 및 환불에 대한 규정"
                    rows={3}
                />
            </div>

            <div className="flex gap-2">
                <Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>
                    취소
                </Button>
                <Button type="submit" className="flex-1">
                    클래스 생성
                </Button>
            </div>
        </form>
    );
}
