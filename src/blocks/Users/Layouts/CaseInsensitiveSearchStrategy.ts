import ISearchStrategy from "./ISearchStrategy";

export default class CaseInsensitiveSearchStrategy implements ISearchStrategy {
    private target?: string;

    public setup(targetText?: string): void {
        this.target = targetText && targetText.toLowerCase();
    }

    public tryFind(source: string): boolean {
        if (!this.target) {
            return true;
        }

        return source.toLowerCase().indexOf(this.target) >= 0;
    }
}
