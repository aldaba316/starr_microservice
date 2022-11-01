 /* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

import { RunningTestInterface } from '../interface';

export const RunningTestSchema = new Schema<RunningTestInterface> ({

    test: {
        type : String,
        required : [ true, 'test is required' ],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    _errorCode: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ErrorCode',
            index: true,
            default: null
        }
    ], 
    registerDate: {
        type: Date,
        default: Date.now
    }
    
});
