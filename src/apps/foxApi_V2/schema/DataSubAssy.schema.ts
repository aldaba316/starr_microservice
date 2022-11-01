import mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { DataSubAssyObjI } from '../interface';

export const DataSubAssySchema = new Schema<DataSubAssyObjI> ({

    TESTLOG: {
        type : String,
        required : [ true, 'TESTLOG is required' ],
        unique: true
    },
    SERIALNO: {
        type : String,
        required : [ true, 'SERIALNO is required' ],
    },
    ASSET_TAG: {
        type : String,
        required : [ true, 'ASSET_TAG is required' ],
    },
    bios_ver: {
        type : String,
        required : [ true, 'bios_ver is required' ],
    },
    cpld_fw: {
        type : String,
        required : [ true, 'cpld_fw is required' ],
    },
    uuid: {
        type : String,
        required : [ true, 'uuid is required' ],
    },
    eccek: {
        type : String,
        required : [ true, 'eccek is required' ],
    },
    'm.2_model': {
        type : String,
        required : [ true, 'm.2_model is required' ],
    },
    'm.2_fw': {
        type : String,
        required : [ true, 'm.2_fw is required' ],
    },
     nic1_fw: {
        type : String,
        required : [ true, 'nic1_fw is required' ],
    },
    nic1_mac_port1: {
        type : String,
        required : [ true, 'nic1_mac_port1 is required' ],
    },
    nic2_fw: {
        type : String,
        required : [ true, 'nic2_fw is required' ],
    },
    nic2_mac_port1: {
        type : String,
        required : [ true, 'nic2_mac_port1 is required' ],
    },
    bmc_fw: {
        type : String,
        required : [ true, 'bmc_fw is required' ],
    },
    bmc_mac_shared: {
        type : String,
        required : [ true, 'bmc_mac_shared is required' ],
    },
    bmc_mac_dedicated: {
        type : String,
        required : [ true, 'bmc_mac_dedicated is required' ],
    },
    tpm_fw: {
        type : String,
        required : [ true, 'tpm_fw is required' ],
    }, 

    _cygnusResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CygnusResponse',
        index: true,
        default: null
    },
    active: {
        type: Boolean, 
        default: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }

});
