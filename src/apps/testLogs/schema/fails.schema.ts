/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

//* Interface //
import { FailsInterface } from '../interface';

export const failsSchema = new Schema<FailsInterface> ({

    strTestlog : {
        type: String,
        required : [ true, 'strTestlog is required' ],
        unique: true
    },

    strSSN : {
        type: String, 
        required : [ true, 'strSSN is required' ],
    },

    strFolder : {
        type: String,
        required : [ true, 'strFolder is required' ],
    },

    strFailDescription : {
        type: String,
        required : [ true, 'strFailDescription is required' ],
    },

    strErrorCode : {
        type: String,
        required : [ true, 'strErrorCode is required' ],
    },

    strSerialChassis : {
        type: String,
        required : [ true, 'strSerialChassis is required' ],
    },

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
