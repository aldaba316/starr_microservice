 /* eslint-disable prettier/prettier */
 import { Schema } from 'mongoose';
 import mongoose from 'mongoose';
 
 import * as _interface from '../interface';
 
 export const OpenRepairSchema = new Schema<_interface.OpenRepairInterface> ({
 
    SSN: {
         type : String,
         required : [ true, 'SSN is required' ],
    },
    position: {
        type : String,
        required : [ true, 'position is required' ],
    },
    _board:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            index: true,
            default: null
    },
    shift: {
        type : String,
        required : [ true, 'shift is required' ],
    },
    _runningTest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RunningTest',
            index: true,
            default: null
    },
    _errorCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ErrorCode',
            index: true,
            default: null
    },
    action: {
        type : String,
        emun: [ 'Replace', 'Reinsert', 'Analysis', 'Retry', 'Reset', 'Relocalization', 'Config', 'Bad Assembly' ]
    },  
    techAnalisis: {
        type : String,
        required : [ true, 'techAnalisis is required' ],
    },   
    priority: {
        type : Number,
        required : [ true, 'priority is required' ],
    },  
    _family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Family',
            index: true,
            default: null
    },
    _assignTo: {
            type: mongoose.Schema.Types.ObjectId,
    },

    _generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },

     _solution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RepairSolution',
        index: true,
        default: null
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
 