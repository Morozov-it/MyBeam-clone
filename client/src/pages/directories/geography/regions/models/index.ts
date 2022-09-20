import { BaseDirectoryFields } from "@models/base"

export interface GeographyRegion extends BaseDirectoryFields {
    countryId: number
    code: string
    prefix: string
    fullName: string
}

export interface CreateRegionValues {
    regions?: {
        countryId: number
        name: string
        code: string
        prefix: string
        fullName: string
    }[]
}