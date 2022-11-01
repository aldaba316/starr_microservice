
export interface FamilyInterface {

    desc : string;
    nodeQty: number;
    active: boolean
    registerDate: Date

}; 

export interface FamilyPagination {

    total: number;
    families: FamilyInterface[ ];

};