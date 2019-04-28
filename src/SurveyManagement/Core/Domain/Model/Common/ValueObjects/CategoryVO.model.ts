export class CategoryVO {
    constructor(
        private readonly _name: string,
    ) {
        if (_name.length === 0) throw new Error("Category cannot be empty.");
        if (_name.length > 50) throw new Error("Category cannot longer than 50 characters.");
    }

    get name(): string {
        return this._name;
    }
}
