import { BusStop } from '@/features/BusLines/types';

const getBusTimes = (stops: BusStop[], selectedStop: string) => {
	return stops.find((stop) => stop.stop === selectedStop)?.time;
};

export default getBusTimes;
