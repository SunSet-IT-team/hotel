import { type AppDispatch, type RootState } from '../store';

/**
 * Базовые параметры ReduxThunk
 */
export interface AppThunkParams {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string; // Тип для rejectWithValue
}
