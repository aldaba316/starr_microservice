/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

//* Interface //
import { WorkOrderInterface } from '../interface';

export const WorkOrderSchema = new Schema<WorkOrderInterface> ({

    workOrder: {
        type : String,
        required : [ true, 'workOrder is required' ],
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
