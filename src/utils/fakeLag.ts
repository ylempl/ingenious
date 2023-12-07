function fakeLag(payload: () => void): void {
	setTimeout(() => {
		payload();
	}, 250);
}

export default fakeLag;
