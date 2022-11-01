/* eslint-disable prettier/prettier */

 //? el diag ya mueve de status no ?
// import { EventResponseInterface } from "./EventResponse.interface"
import { MacAddressInterface } from './';

export interface UutLogInterface {
    
    strTestLog: string;
    strStatus: string;
    strSerialMainBoard: string;
    strAssetTagNode: string;
    strSerialChassis: string;
    strPxebootServer: string;
    strPartNumber: string;
    strProductVersion: string;
    strBoardProduct: string;
    strSKU: string;
    strFolder: string;
    strSerialNode: string;
    dtStartTime: Date;
    dtEndTime: Date;
    strPath: string;
    strFailDescription: string,
    strErrorCode: string,
    // _event_response: EventResponseInterface;
    _macAddress: MacAddressInterface
    active :  boolean;
    registerDate: Date;

};

