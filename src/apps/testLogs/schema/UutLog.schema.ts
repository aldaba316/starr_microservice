/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

//* Interface //
import { UutLogInterface } from '../interface';

export const UutLogSchema = new Schema<UutLogInterface> ({
   
    strTestLog : {
        type: String,
        required : [ true, 'strTestLog is required' ], 
        unique: true
    },
    strStatus: {
        type: String,
        required: [ true, 'strStatus is required' ],
        enum: [ 'PASS', 'FAIL' ]
    },
    strSerialMainBoard : {
        type: String,
        required : [ true, 'strSerialMainBoard is required' ], 
    },
    strAssetTagNode : {
        type: String,
        required : [ true, 'strAssetTagNode is required' ], 
    },
    strSerialChassis : {
        type: String,
        required : [ true, 'strSerialChassis is required' ], 
    },
    strPxebootServer : {
        type: String,
        required : [ true, 'strPxebootServer is required' ], 
    },    
    strPartNumber : {
        type: String,
        required : [ true, 'strPartNumber is required' ], 
    }, 
    strSerialNode : {
        type: String,
        required : [ true, 'strSerialNode is required' ], 
    },  
    strSKU : {
        type: String,
        required : [ true, 'strSKU is required' ], 
    },  
    strProductVersion : {
        type: String,
        required : [ true, 'strProductVersion is required' ], 
    },
    strBoardProduct : {
        type: String,
        required : [ true, 'strBoardProduct is required' ], 
    }, 
    strPath : {
        type: String,
        required : [ true, 'strPath is required' ], 
    },  
    dtStartTime : {
        type: Date,
        required : [ true, 'dtStartTime is required' ], 
    },  
    dtEndTime : {
        type: Date,
        required : [ true, 'dtEndTime is required' ], 
    },  
    strFailDescription : {
        type: String,
        required : [ true, 'strFailDescription is required' ], 
    }, 
    strErrorCode : {
        type: String,
        required : [ true, 'strErrorCode is required' ], 
    }, 
    _macAddress: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MAC_ADDRESS',
            index: true,
            default: null
        }
    ],
    active : {
        type: Boolean,
        required: false,
        default: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }

});
