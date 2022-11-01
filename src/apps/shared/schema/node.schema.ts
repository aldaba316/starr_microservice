/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { NodeInterface } from '../interface/node.interface';

export const NodeSchema = new Schema<NodeInterface> ({

    nodeSerial: {
        type : String,
        required : [ true, 'nodeSerial is required' ],
        unique: true
    },
    nodeAsset: {
        type : String,
        required : [ true, 'nodeAsset is required' ],
    },
    _sendAttributeDataSubAssy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DataSubAssy',
            index: true,
            default: null
        }
    ],
    _QuickTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuickTest',
            index: true,
            default: null
        }
    ],
    _FunctionalTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FunctionalTest',
            index: true,
            default: null
        }
    ],
    _StressTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StressTest',
            index: true,
            default: null
        }
    ],
    _sendAttributeDataAssy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DataAssy',
            index: true,
            default: null
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
    
});
