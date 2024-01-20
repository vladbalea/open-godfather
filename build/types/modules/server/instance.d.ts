export declare class ServerMp {
    private _name;
    private _language;
    private _website;
    private _map;
    private _mode;
    private _stuntBonuses;
    private _nameTagDistance;
    private _hour;
    private _weather;
    constructor();
    set name(name: string);
    get name(): string;
    set language(language: string);
    get language(): string;
    set website(website: string);
    get website(): string;
    set map(map: string);
    get map(): string;
    set mode(mode: string);
    get mode(): string;
    set stuntBonuses(stuntBonuses: boolean);
    get stuntBonuses(): boolean;
    set nameTagDistance(nameTagDistance: number);
    get nameTagDistance(): number;
    set hour(hour: number);
    get hour(): number;
    set weather(weather: number);
    get weather(): number;
    get tickRate(): number;
}
