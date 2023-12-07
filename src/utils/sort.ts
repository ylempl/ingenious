export const sort = (data: [], direction: string, sortBy = 'order') => {
	if (direction === 'ASC') {
		return data.slice().sort((a, b) => a[sortBy] - b[sortBy]);
	} else if (direction === 'DESC') {
		return data.slice().sort((a, b) => b[sortBy] - a[sortBy]);
	}
};

export const sortNumbers = (numbers: number[]) =>
	numbers.slice().sort((a, b) => a - b);

export const sortByTime = (
	table: string[],
	sortDirection: 'ASC' | 'DESC' = 'ASC'
) => {
	return table.sort((a: string, b: string) => {
		const [hourA, minuteA] = a.split(':').map(Number);
		const [hourB, minuteB] = b.split(':').map(Number);

		if (sortDirection === 'ASC') {
			if (hourA === hourB) {
				return minuteA - minuteB;
			} else {
				return hourA - hourB;
			}
		} else {
			if (hourA === hourB) {
				return minuteB - minuteA;
			} else {
				return hourB - hourA;
			}
		}
	});
};
