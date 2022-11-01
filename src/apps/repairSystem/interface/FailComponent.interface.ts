
export interface FailComponentInterface {

    componentName : string;
    active: boolean
    registerDate: Date

}; 

export interface FailComponentPagination {

    total: number;
    components: FailComponentInterface[ ]

};