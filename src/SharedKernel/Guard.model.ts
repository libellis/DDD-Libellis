export class Guard {
	static setsMatch<T>(setA: Set<T>, setB: Set<T>): boolean {
		if (setA.size !== setB.size) return false;

		setA.forEach(elem => {
			if (!setB.has(elem)) {
				return false;
			}
		});

		return true;
	}
}
