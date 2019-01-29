export default interface ISearchStrategy {
    setup(targetText?: string): void;
    tryFind(source: string): boolean;
}
