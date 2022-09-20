import { BaseDirectoryFields } from "@models/base";

export interface GeographyCountry extends BaseDirectoryFields {
    code: string
}

export interface CreateCountriesValues {
    countries?: { name: string, code: string }[]
}
export interface UpdateCountriesValues {
    name: string
    code: string
}