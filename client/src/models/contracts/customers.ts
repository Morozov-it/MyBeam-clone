import { BaseDocFields } from "../base"

export interface Customer extends BaseDocFields {
    INN: string
    KPP: string
    OGRN: string
    typeof_legal_form: string
}