import { Bus, BusMergedTime } from '@/features/BusLines/types';

const getBusStops = (buses: Bus[], selectedBus: number) => {
	return buses
		.filter((bus) => bus.line === selectedBus)
		.reduce((acc: BusMergedTime[], current: Bus) => {
			const existingEntry = acc.find((bus) => bus.stop === current.stop);

			if (existingEntry) {
				existingEntry.time.push(current.time);
			} else {
				acc.push({
					stop: current.stop,
					order: current.order,
					time: [current.time],
				});
			}

			return acc;
		}, []);
};

export default getBusStops;
