interface Options {
    locale?: string;
}
type Items = Record<string, string>;
declare class Game {
    _titles: Items;
    _genres: Items;
    _platforms: Items;
    _defaultLocale: string;
    _options?: Options;
    title(): string;
    genre(): string;
    platform(): string;
    _selectRandom(items: Items): string;
}
export default function game(options?: Options): Game;
