import { ReactNode } from 'react';

export interface AlertBarProps {
	isOpen: boolean;
	severity: 'success' | 'warning' | 'info' | 'error';
	message: string | ReactNode;
	autoHideDuration?: number;
	alertClear: () => void;
}
