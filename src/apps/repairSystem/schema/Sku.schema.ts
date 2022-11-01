/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

import { SkuInterface } from '../interface';

export const SkuSchema = new Schema<SkuInterface> ({

    sku: {
        type : String,
        required : [ true, 'sku is required' ],
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
