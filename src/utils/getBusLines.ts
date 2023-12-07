import { Bus } from '@/features/BusLines/types';

const getBusLines = (buses: Bus[]): number[] => {
	const uniqueLines = buses.reduce((acc: Set<number>, current: Bus) => {
		acc.add(current.line);
		return acc;
	}, new Set<number>());

	return Array.from(uniqueLines);
};

export default getBusLines;
