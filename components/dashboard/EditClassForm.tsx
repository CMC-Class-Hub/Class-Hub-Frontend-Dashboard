"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { AddressSearchInput } from "@/components/ui/AddressSearchInput";
import type { ClassTemplate } from "@/lib/api";

export function EditClassForm({ template, onSubmit, onCancel }: {
    template: ClassTemplate;
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
    const [name, setName] = useState(template.name);
    const [description, setDescription] = useState(template.description || '');
    const [location, setLocation] = useState(template.location);
    const [locationDetails, setLocationDetails] = useState(template.locationDetails || '');
    const [preparation, setPreparation] = useState(template.preparation || '');
    const [instructions, setInstructions] = useState(template.instructions || '');
    const [images, setImages] = useState<string[]>(template.images || []);
    const [price, setPrice] = useState(template.price || 0);
    const [parkingInfo, setParkingInfo] = useState(template.parkingInfo || '');
    const [cancellationPolicy, setCancellationPolicy] = useState(template.cancellationPolicy || '');

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
                <Label htmlFor="editClassName">클래스명 *</Label>
                <Input
                    id="editClassName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 요가 초급 클래스"
                    required
                    autoFocus
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassDescription">소개글</Label>
                <Textarea
                    id="editClassDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="클래스에 대한 간단한 설명"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassPrice">1인 가격 (원)</Label>
                <Input
                    id="editClassPrice"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    placeholder="0"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassLocation">장소 *</Label>
                <AddressSearchInput
                    value={location}
                    onChange={setLocation}
                    placeholder="주소 검색 (클릭)"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassLocationDetails">위치 안내</Label>
                <Textarea
                    id="editClassLocationDetails"
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    placeholder="건물 입구, 주차 정보 등 상세 주소"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassParkingInfo">주차 안내</Label>
                <Textarea
                    id="editClassParkingInfo"
                    value={parkingInfo}
                    onChange={(e) => setParkingInfo(e.target.value)}
                    placeholder="주차 가능 여부 및 주차장 위치 안내"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassPreparation">준비물</Label>
                <Textarea
                    id="editClassPreparation"
                    value={preparation}
                    onChange={(e) => setPreparation(e.target.value)}
                    placeholder="예: 요가매트, 운동복, 물"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassInstructions">안내사항</Label>
                <Textarea
                    id="editClassInstructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="수강생에게 전달할 추가 안내사항"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassCancellationPolicy">취소/환불 규정</Label>
                <Textarea
                    id="editClassCancellationPolicy"
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
                    클래스 수정
                </Button>
            </div>
        </form>
    );
}
