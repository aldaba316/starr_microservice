
export interface SkuInterface {

    sku : string;
    active: boolean
    registerDate: Date

};

export interface SkuPagination {

    total: number;
    skus: SkuInterface[ ]

};