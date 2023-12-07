export interface Bus {
	line: number;
	stop: string;
	order: number;
	time: string;
}

export interface BusStop {
	stop: string;
	order: number;
	time: string[];
}

export interface BusMergedTime {
	stop: string;
	order: number;
	time: string[];
}
