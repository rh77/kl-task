import ISearchStrategy from "./ISearchStrategy";

export default class CaseInsensitiveSearchStrategy implements ISearchStrategy {
    
    public tryFind(source: string, target: string): boolean {
        return source.toLowerCase().indexOf(target.toLowerCase()) > 0;
    }
}
