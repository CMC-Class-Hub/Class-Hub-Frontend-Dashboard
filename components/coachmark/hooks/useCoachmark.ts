import { useContext } from 'react';
import { CoachmarkContext, type CoachmarkContextValue } from '../CoachmarkProvider';

export function useCoachmark(): CoachmarkContextValue {
    const context = useContext(CoachmarkContext);
    if (!context) {
        throw new Error('useCoachmark must be used within CoachmarkProvider');
    }
    return context;
}
