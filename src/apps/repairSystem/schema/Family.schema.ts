/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

import { FamilyInterface } from '../interface';

export const FamilySchema = new Schema<FamilyInterface> ({

    desc: {
        type : String,
        required : [ true, 'desc is required' ],
        unique: true
    },
    nodeQty: {

        type: Number,
        required: [ true, 'nodeQty is required' ]

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
