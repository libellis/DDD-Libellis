import { ValueObject } from "../../../../../../shared-kernel/ValueObject.model";

export class Category extends ValueObject {
    private static maxLength = 50;
    private readonly _name: string;

    constructor(
        name: string,
    ) {
      Category.validityCheck(name);
      super();
      this._name = name;
    }

    get name(): string {
        return this._name;
    }

    protected get getEqualityComponents(): Set<string | number> {
      return new Set(this._name);
    }

    static validityCheck(name: string) {
      if (Category.isEmpty(name)) {
        throw new Error("Category cannot be empty.");
      }
      if (Category.isTooLong(name)) {
        throw new Error(`Category cannot longer than ${this.maxLength} characters.`);
      }
    }

    private static isEmpty(name: string): boolean {
      return name === '';
    }

    private static isTooLong(name: string): boolean {
      return (name.length > this.maxLength);
    }
}
