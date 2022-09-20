import { BaseDirectoryFields } from "@models/base"

export interface GeographyLocality extends BaseDirectoryFields {
    countryId: number
    regionId: number
    district: string
    districtPrefix: string
    namePrefix: string
    area?: string
    areaPrefix?: string
}

export interface CreateLocalityValues {
    localities?: {
        name: string
        countryId: number
        regionId: number
        district: string
        districtPrefix: string
        namePrefix: string
        area: string
        areaPrefix: string
    }[]
}