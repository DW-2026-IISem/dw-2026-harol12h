interface Options {
    locale?: string;
}
type Items = Record<string, string>;
declare class Sport {
    _unusual: Items;
    _ancientOlympics: Items;
    _summerOlympics: Items;
    _summerParalympics: Items;
    _winterOlympics: Items;
    _winterParalympics: Items;
    _defaultLocale: string;
    _options?: Options;
    unusual(): string;
    ancientOlympics(): string;
    summerOlympics(): string;
    summerParalympics(): string;
    winterOlympics(): string;
    winterParalympics(): string;
    _selectRandom(items: Items): string;
}
export default function sport(options?: Options): Sport;
