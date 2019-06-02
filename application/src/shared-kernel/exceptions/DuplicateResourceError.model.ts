export class DuplicateResourceError extends Error {
    constructor(
        message?: string,
    ) {
        super(message);
        this.name = "DuplicateResourceError";
    }
}