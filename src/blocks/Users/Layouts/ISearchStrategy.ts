export default interface ISearchStrategy {
    tryFind(source: string, target: string): boolean;
}
