export interface IClonable<T> {
	clone(type:{new():T;}): T;
}