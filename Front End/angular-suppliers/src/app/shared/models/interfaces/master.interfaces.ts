export interface SupplierModel {
    Id: number,
    CompanyName: string,
    Name: string,
    TaxIdentification: number,
    PhoneNumber: string,
    Email: string,
    WebSite: string,
    Address: string,
    Country: string,
    AnnualBilling: number,
    LastModified: Date,
}

export interface OffshoreModel {
    Entity: string,
    Juristiction: string,
    LinkedTo: string,
    DataFrom: string,
}

export interface WorldBankModel {
    FirmName: string,
    Address: string,
    Country: string,
    FromDate: string,
    ToDate: string,
    Grounds: string,
}

export interface OFACModel {
    Name: string,
    Address: string,
    Type: string,
    Programs: string,
    List: string,
    Score: string,
}