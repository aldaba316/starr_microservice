import { CygnusResponseI } from './CygnusResponse.interface';

export interface  DataSubAssyObjI {

    TESTLOG: string;
    SERIALNO: string
    ASSET_TAG: string
    bios_ver: string
    cpld_fw: string
    uuid: string
    eccek: string
    'm.2_model': string
    'm.2_fw': string
    nic1_fw: string
    nic1_mac_port1: string
    nic2_fw: string
    nic2_mac_port1: string
    bmc_fw: string
    bmc_mac_shared: string
    bmc_mac_dedicated: string
    tpm_fw: string,
    _cygnusResponse: CygnusResponseI,
    active: boolean,
    register_date: Date,
       
};

export interface  DataSubAssyI {

    sendAttributeDataSubAssy: DataSubAssyObjI []

};

