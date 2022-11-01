/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

//* Interface //
import { MacAddressInterface } from '../interface';

export const MacAddressSchema = new Schema<MacAddressInterface> ({

    macAddress: {
        type : String,
        required : [ true, 'strSerialMainBoard is required' ]
    },
    active: {
        type: Boolean,
        default: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
    
});
