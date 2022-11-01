
//* Interfaces //
import { DataAssyI } from '../../../apps/foxApi_V2/interface';
import { DataSubAssyI } from 'src/apps/foxApi_V2/interface/DataSubAssy.interface';
import { UutLogInterface } from '../../../apps/testLogs/interface';

//* Mongosee //
import { Types } from 'mongoose';

export interface NodeInterface {

    _id: Types.ObjectId,   
    nodeSerial: string; 
    nodeAsset: string;
    _QuickTest: UutLogInterface;
    _FunctionalTest: UutLogInterface;
    _StressTest: UutLogInterface;
    _sendAttributeDataSubAssy: DataSubAssyI;  
    _sendAttributeDataAssy: DataAssyI;
    active:  boolean;
    register_date: Date;

};