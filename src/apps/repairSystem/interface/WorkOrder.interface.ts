/* eslint-disable prettier/prettier */
export interface WorkOrderInterface {

    workOrder : string;
    active: boolean
    registerDate: Date

}; 

export interface WorkOrderPagination {

    total: number;
    wos: WorkOrderInterface[ ]

};