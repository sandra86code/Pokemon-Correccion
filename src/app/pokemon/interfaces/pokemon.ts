// To parse this data:
//
//   import { Convert, CountrySearchResponse } from "./file";
//
//   const countrySearchResponse = Convert.toCountrySearchResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CountrySearchResponse {
    pokemons: Pokemon[];
}

export interface Pokemon {
    id:   number;
    name: Name;
    type: Type[];
    base: Base;
}

export interface Base {
    HP:            number;
    Attack:        number;
    Defense:       number;
    "Sp. Attack":  number;
    "Sp. Defense": number;
    Speed:         number;
}

export interface Name {
    english:  string;
    japanese: string;
    chinese:  string;
    french:   string;
}

export enum Type {
    Bug = "Bug",
    Dark = "Dark",
    Dragon = "Dragon",
    Electric = "Electric",
    Fairy = "Fairy",
    Fighting = "Fighting",
    Fire = "Fire",
    Flying = "Flying",
    Ghost = "Ghost",
    Grass = "Grass",
    Ground = "Ground",
    Ice = "Ice",
    Normal = "Normal",
    Poison = "Poison",
    Psychic = "Psychic",
    Rock = "Rock",
    Steel = "Steel",
    Water = "Water",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCountrySearchResponse(json: string): CountrySearchResponse {
        return cast(JSON.parse(json), r("CountrySearchResponse"));
    }

    public static countrySearchResponseToJson(value: CountrySearchResponse): string {
        return JSON.stringify(uncast(value, r("CountrySearchResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "CountrySearchResponse": o([
        { json: "pokemons", js: "pokemons", typ: a(r("Pokemon")) },
    ], false),
    "Pokemon": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: r("Name") },
        { json: "type", js: "type", typ: a(r("Type")) },
        { json: "base", js: "base", typ: r("Base") },
    ], false),
    "Base": o([
        { json: "HP", js: "HP", typ: 0 },
        { json: "Attack", js: "Attack", typ: 0 },
        { json: "Defense", js: "Defense", typ: 0 },
        { json: "Sp. Attack", js: "Sp. Attack", typ: 0 },
        { json: "Sp. Defense", js: "Sp. Defense", typ: 0 },
        { json: "Speed", js: "Speed", typ: 0 },
    ], false),
    "Name": o([
        { json: "english", js: "english", typ: "" },
        { json: "japanese", js: "japanese", typ: "" },
        { json: "chinese", js: "chinese", typ: "" },
        { json: "french", js: "french", typ: "" },
    ], false),
    "Type": [
        "Bug",
        "Dark",
        "Dragon",
        "Electric",
        "Fairy",
        "Fighting",
        "Fire",
        "Flying",
        "Ghost",
        "Grass",
        "Ground",
        "Ice",
        "Normal",
        "Poison",
        "Psychic",
        "Rock",
        "Steel",
        "Water",
    ],
};
