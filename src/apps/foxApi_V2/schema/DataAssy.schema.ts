import mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { DataAssyObjI } from '../interface';

export const DataAssyObjSchema = new Schema<DataAssyObjI> ({

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
   
    PSU1_REV: {
        type : String,
        required : [ true, 'PSU1_REV is required' ],
    },
   
    PSU1_FW: {
        type : String,
        required : [ true, 'PSU1_FW is required' ],
    },

    PSU2_REV: {
        type : String,
        required : [ true, 'PSU2_REV is required' ],
    },

    PSU2_FW: {
        type : String,
        required : [ true, 'PSU2_FW is required' ],
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
