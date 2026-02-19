"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { getErrorMessage, validateEmail } from "@/lib/utils";

// 전화번호 자동 포맷팅 (01012345678 → 010-1234-5678)
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    privacy?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // 약관 동의 상태
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showTermsDetail, setShowTermsDetail] = useState(false);
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    setIsLoading(true);

    const newErrors: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
      privacy?: string;
    } = {};

    if (!name) newErrors.name = "이름을 입력해주세요.";
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!phoneNumber) newErrors.phoneNumber = "전화번호를 입력해주세요.";
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 4) {
      newErrors.password = "비밀번호는 4자 이상이어야 합니다.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!agreedToTerms) newErrors.terms = "서비스 이용약관에 동의해주세요.";
    if (!agreedToPrivacy) newErrors.privacy = "개인정보 수집·이용에 동의해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // 회원가입
      await api.auth.signUp({ signUpRequest: { email, name, password, phoneNumber } });
    } catch (err: any) {
      const message = await getErrorMessage(err, "회원가입에 실패했습니다.");
      setError(message);
      setIsLoading(false);
      return;
    }

    try {
      // 자동 로그인
      await api.auth.login({ loginRequest: { email, password } });

      if (ref === "landing") {
        router.push("/dashboard?ref=landing");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      // 회원가입은 성공했지만 로그인 실패 시 로그인 페이지로
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] p-4 sm:p-6">
      <Card className="w-full max-w-[420px] p-2 sm:p-4">
        <CardHeader className="text-center pb-2">
          <Link href="/" className="inline-block">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-[#3182F6] cursor-pointer hover:opacity-80 transition-opacity">
              Class Hub
            </CardTitle>
          </Link>
          <CardDescription className="text-sm sm:text-base mt-2 text-[#6B7684]">
            강사 계정을 만들어보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
                }}
              />
              {validationErrors.name && (
                <p className="text-xs text-[#F04452] font-medium mt-1">{validationErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
                }}
              />
              {validationErrors.email && (
                <p className="text-xs text-[#F04452] font-medium mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="010-0000-0000"
                value={phoneNumber}
                onChange={(e) => {
                  handlePhoneChange(e);
                  if (validationErrors.phoneNumber) setValidationErrors({ ...validationErrors, phoneNumber: undefined });
                }}
                maxLength={13}
              />
              {validationErrors.phoneNumber && (
                <p className="text-xs text-[#F04452] font-medium mt-1">{validationErrors.phoneNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 (4자 이상)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: undefined });
                }}
              />
              {validationErrors.password && (
                <p className="text-xs text-[#F04452] font-medium mt-1">{validationErrors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (validationErrors.confirmPassword) setValidationErrors({ ...validationErrors, confirmPassword: undefined });
                }}
              />
              {validationErrors.confirmPassword && (
                <p className="text-xs text-[#F04452] font-medium mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* 약관 동의 섹션 */}
            <div className="space-y-3 pt-2 border-t">
              {/* 서비스 이용약관 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="termsAgree"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (validationErrors.terms) setValidationErrors({ ...validationErrors, terms: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <label htmlFor="termsAgree" className="flex-1 text-sm cursor-pointer">
                    <span className="text-black-400 font-semibold">[필수]</span> 서비스 이용약관에 동의합니다.
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTermsDetail(!showTermsDetail)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${showTermsDetail ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {showTermsDetail && (
                  <div className="ml-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-700 leading-relaxed max-h-60 overflow-y-auto space-y-2">
                    <h4 className="font-bold text-sm text-gray-900">📄 강사용 서비스 이용약관</h4>

                    <div>
                      <h5 className="font-semibold text-gray-800">제1조 (목적)</h5>
                      <p>본 약관은 [회사명] (이하 "회사")이 제공하는 원데이 클래스 플랫폼 서비스(이하 "서비스")를 강사 회원이 이용함에 있어 회사와 강사 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제2조 (정의)</h5>
                      <p>1. "강사"란 본 약관에 동의하고 플랫폼에 가입하여 클래스를 개설·운영하는 회원을 말합니다.</p>
                      <p>2. "서비스"란 강사가 클래스를 등록·관리하고 수강생을 모집할 수 있도록 회사가 제공하는 온라인 플랫폼을 의미합니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제3조 (회원가입 및 계정관리)</h5>
                      <p>1. 강사는 정확한 정보를 제공해야 합니다.</p>
                      <p>2. 계정 관리 책임은 강사 본인에게 있습니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제4조 (강사의 의무)</h5>
                      <p>1. 관련 법령을 준수하여 클래스를 운영해야 합니다.</p>
                      <p>2. 허위·과장 정보 등록을 금지합니다.</p>
                      <p>3. 수강생과의 분쟁은 우선적으로 강사가 해결해야 합니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제5조 (서비스 이용 제한)</h5>
                      <p>회사는 약관 위반 또는 법령 위반 시 서비스 이용을 제한할 수 있습니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제6조 (계약 해지 및 탈퇴)</h5>
                      <p>강사는 언제든 탈퇴할 수 있으며, 탈퇴 시 개인정보는 관련 법령에 따라 처리됩니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제7조 (면책)</h5>
                      <p>회사는 강사와 수강생 간 발생하는 분쟁에 대해 직접적인 책임을 지지 않습니다.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">제8조 (준거법)</h5>
                      <p>본 약관은 대한민국 법률에 따릅니다.</p>
                    </div>
                  </div>
                )}
              </div>
              {validationErrors.terms && (
                <p className="text-xs text-[#F04452] font-medium mt-1 ml-6">{validationErrors.terms}</p>
              )}

              {/* 개인정보 수집·이용 동의 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacyAgree"
                    checked={agreedToPrivacy}
                    onChange={(e) => {
                      setAgreedToPrivacy(e.target.checked);
                      if (validationErrors.privacy) setValidationErrors({ ...validationErrors, privacy: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <label htmlFor="privacyAgree" className="flex-1 text-sm cursor-pointer">
                    <span className="text-black-400 font-semibold">[필수]</span> 개인정보 수집·이용에 동의합니다.
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPrivacyDetail(!showPrivacyDetail)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${showPrivacyDetail ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {showPrivacyDetail && (
                  <div className="ml-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-700 leading-relaxed space-y-2">
                    <h4 className="font-bold text-sm text-gray-900">📄 개인정보 수집·이용 동의서</h4>
                    <p>회사는 강사 회원가입 및 서비스 제공을 위해 다음과 같이 개인정보를 수집·이용합니다.</p>

                    <div>
                      <h5 className="font-semibold text-gray-800">1. 수집 항목</h5>
                      <ul className="ml-4 list-disc">
                        <li>이름</li>
                        <li>이메일 주소</li>
                        <li>전화번호</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">2. 수집 목적</h5>
                      <ul className="ml-4 list-disc">
                        <li>강사 회원 식별 및 계정 생성</li>
                        <li>서비스 제공 및 운영</li>
                        <li>서비스 관련 공지 및 안내</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">3. 보유 및 이용 기간</h5>
                      <ul className="ml-4 list-disc">
                        <li>회원 탈퇴 시까지</li>
                        <li>단, 관련 법령에 따른 보관 의무가 있는 경우 해당 기간까지 보관</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800">4. 동의 거부 권리</h5>
                      <p>귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만, 동의하지 않을 경우 회원가입이 제한됩니다.</p>
                    </div>
                  </div>
                )}
              </div>
              {validationErrors.privacy && (
                <p className="text-xs text-[#F04452] font-medium mt-1 ml-6">{validationErrors.privacy}</p>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-[#FFEBEE] text-[#F04452] text-sm font-medium">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#6B7684]">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-[#3182F6] hover:underline font-semibold">
                로그인
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6]">
        <div className="w-8 h-8 border-4 border-[#E5E8EB] border-t-[#3182F6] rounded-full animate-spin"></div>
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}