export interface ErrorCodeInterface {

    code : string;
    description: string;
    active: boolean
    registerDate: Date

}; 

export interface ErrorCodePagination {

    total: number,
    codes: ErrorCodeInterface[ ]

};