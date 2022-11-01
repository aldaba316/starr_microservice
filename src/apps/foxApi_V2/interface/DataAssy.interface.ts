import { CygnusResponseI } from './CygnusResponse.interface';

export interface DataAssyObjI {

    TESTLOG: string;
    SERIALNO: string
    ASSET_TAG: string;
    PSU1_REV: string;
    PSU1_FW: string;
    PSU2_REV: string;
    PSU2_FW: string;
    _cygnusResponse: CygnusResponseI; 
    active: boolean;
    register_date: Date;

}; 

export interface DataAssyI {

    sendAttributeDataAssy: DataAssyObjI;

};

