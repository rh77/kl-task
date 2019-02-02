import ISearchStrategy, { HighlighterFunc, IHighlightToken } from "./ISearchStrategy";

export default class CaseInsensitiveSearchStrategy implements ISearchStrategy {
    private target?: string;

    public setTargetText(targetText?: string): void {
        this.target = targetText && targetText.trim().toLowerCase();
    }

    public getHighlighterFunction(): HighlighterFunc {
        return (source: string) => {

            const target = this.target;
            if (!target || !source) {
                return [{ text: source, isHighlighted: false }];
            }

            const sourceLower = source.toLowerCase();
            let position = 0;
            const tokens: IHighlightToken[] = [];

            while (true) {
                const i: number = sourceLower.indexOf(target, position);
                if (i < 0) {
                    tokens.push({ text: source.slice(position), isHighlighted: false });
                    break;
                }

                tokens.push({ text: source.slice(position, i), isHighlighted: false });
                tokens.push({ text: source.substr(i, target.length), isHighlighted: true });
                position = i + target.length;
            }

            return tokens;
        };
    }

    public tryFind(source: string): boolean {
        if (!this.target) {
            return true;
        }

        return source.toLowerCase().indexOf(this.target) >= 0;
    }
}
