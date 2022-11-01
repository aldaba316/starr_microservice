import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export const RepairSolutionSchema = new Schema<any> ({
    
    newCT: {
        type : String,
        defaull: null
    },

    oldCT: {
        type : String,
        defaull: null
    },

    RepairAnalisis: {
        type : String,
        required: [ true, 'RepairAnalisis is required' ]
    },

    actionTaked: {
        type : String,
        emun: [ 'Replace', 'Reinsert', 'Analysis', 'Retry', 'Reset', 'Relocalization', 'Config', 'Bad Assembly' ]
    },

    _componentRepaired: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FailComponent',
        index: true,
        default: null
    },

    _repair: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repair',
        index: true,
        default: null
    },

     registerDate: {
         type: Date,
         default: Date.now
     }
     
 });
 