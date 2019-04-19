export abstract class Entity {
	private _version = 0;
	private _discarded = false;

	protected constructor (
		private readonly _id: string,
	) {}

	get version(): number {
		return this._version;
	}

	get discarded(): boolean {
		return this._discarded;
	}

	get id(): string {
		return this._id;
	}

	// Can't override equality operator in js/ts so we make explicit method.
	equals(other: Entity): boolean {
		return (this.id === other.id);
	}

	incrementVersion(): void {
		this._version++;
	}
}
