/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

import { ErrorCodeInterface } from '../interface';

export const ErrorCodeSchema = new Schema<ErrorCodeInterface> ({

    code: {
        type : String,
        required : [ true, 'code is required' ],
        unique: true
    },
    description: {
        type : String,
        required : [ true, 'description is required' ]
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
