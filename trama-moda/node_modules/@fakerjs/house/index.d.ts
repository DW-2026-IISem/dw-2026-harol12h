interface Options {
    locale?: string;
}
type Items = Record<string, string>;
declare class House {
    _rooms: Items;
    _furnitures: Items;
    _defaultLocale: string;
    _options?: Options;
    room(): string;
    furniture(): string;
    _selectRandom(items: Items): string;
}
export default function house(options?: Options): House;
