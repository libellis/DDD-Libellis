export abstract class ValueObject {
	// typescript is really weird - you can't declare a method signature only
	// in abstract classes so we have to use a getter as a workaround.
	protected abstract get getEqualityComponents(): Set<string | number>;

	equals(other: object): boolean {
		if (other === undefined) {
			return false;
		}

		if (other.constructor !== this.constructor) {
			return false;
		}

		let otherValueObject = other as ValueObject;

		return this.setsMatch(
			this.getEqualityComponents,
			otherValueObject.getEqualityComponents
		);
	}

	private setsMatch<T>(setA: Set<T>, setB: Set<T>): boolean {
		if (setA.size !== setB.size) return false;

		for (const elem of setA) {
			if (!setB.has(elem)) {
				return false;
			}
		}

		return true;
	}
}