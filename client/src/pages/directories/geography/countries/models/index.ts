import { BaseDirectoryFields } from "@models/base"

export interface GeographyCountry extends BaseDirectoryFields {
    code: string
}

export interface CreateCountryValues {
    countries?: {
        name: string
        code: string
    }[]
}