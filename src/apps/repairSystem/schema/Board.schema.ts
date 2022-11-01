 /* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

import { BoardInterface } from '../interface';

export const BoardSchema = new Schema<BoardInterface> ({

    boardName: {
        type : String,
        required : [ true, 'boardName is required' ],
        unique: true
    },
    boardNodes: {
        type : Number,
        required : [ true, 'boardNodes is required' ]
    },
    _user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
    
});
