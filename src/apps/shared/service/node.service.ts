import { Injectable, Inject, ConflictException } from "@nestjs/common";

import { Model, Types } from 'mongoose';

import { NodeInterface } from "../interface/node.interface";   

@Injectable( )
export class NodeService { 

    constructor(

        @Inject( 'NODE' ) 
        private readonly nodeInstance: Model<NodeInterface>
        
    ) { }

    public async createFindOne( nodeSerial: string , nodeAsset: string ): Promise<NodeInterface> {

        const node = await this.nodeInstance.findOne( { nodeSerial } );

        if ( node ) {
            
            return node;

        };

        const data = new this.nodeInstance( { nodeSerial, nodeAsset } );

        return await data.save( );
        
    };

     //* Push _Functional, _quicktest, _StressTest SKU to Node //
     public async updateOne_pushTest( nodeID: Types.ObjectId, dinamicTest: string, testID: Types.ObjectId ): Promise<any> {

        return await this.nodeInstance.findByIdAndUpdate( { '_id': nodeID },  { $push:  { [ dinamicTest ]: testID } } );

    };

    // PATCH cygnus report _id to node //
    public async updateOne_DataSubAssy( NodeID: Types.ObjectId, setSubAssyObjID: Types.ObjectId ): Promise<NodeInterface> {

        const data = await this.nodeInstance.findByIdAndUpdate(
            { '_id': NodeID }, 
            { $push: 
                { '_sendAttributeDataSubAssy': setSubAssyObjID._id }
            }
        );

        return data;
        
    };

    //! Pendiente de interface alv perro culiado //
    public async findAll_array ( array ): Promise<any> {

        let response = [ ];

        for ( const iterator of array.arraySSN ) {

            const node = await this.nodeInstance.findOne( { nodeSerial: iterator.SSN } )
                        .populate( '_QuickTest' )
                        .populate( '_FunctionalTest' )
                        .populate( '_StressTest' )
                        .populate( '_sendAttributeDataSubAssy' )
                        .populate( { path: '_sendAttributeDataSubAssy', populate: { path: '_cygnusResponse' } } )
                        .populate( { path: '_sendAttributeDataSubAssy', populate: { path: '_cygnusResponse' } } );
                    
            ( node )
                ? response = [ ...response, { SSN: iterator.SSN, ok: true, node } ]
                : response = [ ...response, { SSN: iterator.SSN, ok: false, errors: [ `${ iterator.SSN } not exist ` ] } ]
        
        };

        return response;

    };

    // PATCH cygnus report _id to node //
     public async  updateOne_DataAssy( NodeID, setAssyObjID ): Promise<NodeInterface> {

        const data = await this.nodeInstance.findByIdAndUpdate(
            { '_id': NodeID }, 
            { $push: 
                { '_sendAttributeDataAssy': setAssyObjID._id }
            }
        );

        return data;
        
    };


} 