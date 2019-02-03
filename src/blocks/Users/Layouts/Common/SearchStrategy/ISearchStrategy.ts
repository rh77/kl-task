import IHighlightToken from "../HighlightedToken/IHighlightToken";

export default interface ISearchStrategy {
    setTargetText(targetText?: string): void;
    tryFind(source: string): boolean;
    getHighlighterFunction(): HighlighterFunc;
}

export type HighlighterFunc = (source: string) => IHighlightToken[];
