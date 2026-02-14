"use client";

import { useState, useEffect } from "react";
import { MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { AddressSearchInput } from "@/components/ui/AddressSearchInput";
import type { ClassTemplate } from "@/lib/api";

export function EditClassForm({ template, onSubmit, onCancel, onPreview, onOpenPreview }: {
    template: ClassTemplate;
    onSubmit: (data: {
        name: string;
        description: string;
        location: string;
        locationDetails: string;
        preparation: string;
        instructions: string;
        images?: string[];
        parkingInfo?: string;
        cancellationPolicy?: string;
    }) => void;
    onCancel: () => void;
    onPreview?: (data: {
        name: string;
        description: string;
        location: string;
        locationDetails: string;
        preparation: string;
        instructions: string;
        imageUrls: string[];
        parkingInfo: string;
        cancellationPolicy: string;
    }) => void;
    onOpenPreview?: () => void;
}) {
    const [name, setName] = useState(template.name);
    const [description, setDescription] = useState(template.description || '');
    const [location, setLocation] = useState(template.location);
    const [locationDetails, setLocationDetails] = useState(template.locationDetails || '');
    const [preparation, setPreparation] = useState(template.preparation || '');
    const [instructions, setInstructions] = useState(template.instructions || '');
    const [imageUrls, setImageUrls] = useState<string[]>(template.imageUrls || []); // 여기 수정!
    const [parkingInfo, setParkingInfo] = useState(template.parkingInfo || '');
    const [cancellationPolicy, setCancellationPolicy] = useState(template.cancellationPolicy || '');
    const [errors, setErrors] = useState<{ name?: string; description?: string; location?: string }>({});

    const handlePreview = () => {
        onPreview?.({
            name,
            description,
            location,
            locationDetails,
            preparation,
            instructions,
            imageUrls,
            parkingInfo,
            cancellationPolicy,
        });
    };

    // Real-time preview sync
    useEffect(() => {
        handlePreview();
    }, [name, description, location, locationDetails, preparation, instructions, imageUrls, parkingInfo, cancellationPolicy]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const newErrors: { name?: string; description?: string; location?: string } = {};

        if (!name.trim()) {
            newErrors.name = '클래스명을 입력해주세요.';
        }
        if (!description.trim()) {
            newErrors.description = '소개글을 입력해주세요.';
        }
        if (!location.trim()) {
            newErrors.location = '장소를 입력해주세요.';
        }

        setErrors(newErrors);

        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        onSubmit({
            name,
            description,
            location,
            locationDetails,
            preparation,
            instructions,
            images: imageUrls,
            parkingInfo,
            cancellationPolicy,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>대표 이미지 (여러 장 선택 가능)</Label>
                <ImageUpload values={imageUrls} onChange={setImageUrls} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassName">클래스명 *</Label>
                <Input
                    id="editClassName"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="예: 요가 초급 클래스"
                    autoFocus
                />
                {errors.name && (
                    <p className="text-xs text-[#F04452] font-medium">{errors.name}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassDescription">소개글 *</Label>
                <Textarea
                    id="editClassDescription"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors({ ...errors, description: undefined });
                    }}
                    placeholder="클래스에 대한 간단한 설명"
                    rows={3}
                />
                {errors.description && (
                    <p className="text-xs text-[#F04452] font-medium">{errors.description}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="editClassLocation">장소 *</Label>
                <div className="space-y-1">
                    <AddressSearchInput
                        value={location}
                        onChange={setLocation}
                        onAddressSelected={(data) => {
                            setLocation(data.address);
                            if (data.buildingName) {
                                setLocationDetails(prev => prev ? `${prev} ${data.buildingName}` : data.buildingName);
                            }
                        }}
                        placeholder="주소 검색 (클릭)"
                    />
                    <Input
                        id="editClassLocationDetails"
                        value={locationDetails}
                        onChange={(e) => setLocationDetails(e.target.value)}
                        placeholder="건물 입구, 주차 정보 등 상세 주소"
                    />
                </div>
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
                <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onClick={() => {
                        handlePreview();
                        onOpenPreview?.();
                    }}
                >
                    <MonitorSmartphone className="mr-2 h-4 w-4" />
                    신청 화면 미리보기
                </Button>
                <Button type="submit" className="flex-1">
                    클래스 수정
                </Button>
            </div>
        </form>
    );
}