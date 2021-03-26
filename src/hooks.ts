import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppState, AppDispatch } from './store/rootStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
