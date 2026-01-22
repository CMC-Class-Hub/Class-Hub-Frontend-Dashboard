import { Student, TrustLevel } from '@/types';

export const calculateTrustLevel = (student: Student): TrustLevel => {
  const totalActions = student.applicationCount;
  
  if (totalActions === 0) return 'NORMAL';
  
  const negativeActions = student.cancellationCount + student.noResponseCount + student.noShowCount;
  const negativeRate = negativeActions / totalActions;
  
  // 노쇼가 2회 이상이면 무조건 위험
  if (student.noShowCount >= 2) return 'WARNING';
  
  // 부정적 행동이 50% 이상이면 위험
  if (negativeRate >= 0.5) return 'WARNING';
  
  // 부정적 행동이 30% 이상이면 주의
  if (negativeRate >= 0.3) return 'CAUTION';
  
  return 'NORMAL';
};

export const getTrustLevelColor = (level: TrustLevel): string => {
  switch (level) {
    case 'NORMAL':
      return 'text-green-600';
    case 'CAUTION':
      return 'text-yellow-600';
    case 'WARNING':
      return 'text-red-600';
  }
};

export const getTrustLevelBadgeColor = (level: TrustLevel): string => {
  switch (level) {
    case 'NORMAL':
      return 'bg-green-100 text-green-800';
    case 'CAUTION':
      return 'bg-yellow-100 text-yellow-800';
    case 'WARNING':
      return 'bg-red-100 text-red-800';
  }
};

export const getTrustLevelText = (level: TrustLevel): string => {
  switch (level) {
    case 'NORMAL':
      return '정상';
    case 'CAUTION':
      return '주의';
    case 'WARNING':
      return '위험';
  }
};
