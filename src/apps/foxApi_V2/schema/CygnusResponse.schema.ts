
import { Schema } from 'mongoose';
import { CygnusResponseI } from '../interface';

export const CygnusResponseSchema = new Schema<CygnusResponseI> ({

    message: {
        type : String,
        required : [ true, 'message is required' ]
    },
    status: {
        type: String,
        required: [ true, 'status is required' ]
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
