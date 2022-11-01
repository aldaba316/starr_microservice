/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

import { FailComponentInterface } from '../interface';

export const FailComponentSchema = new Schema<FailComponentInterface> ({

    componentName: {
        type : String,
        required : [ true, 'componentName is required' ],
        unique: true
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
