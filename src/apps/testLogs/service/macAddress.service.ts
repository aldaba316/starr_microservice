/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, Inject } from "@nestjs/common";

//* DTO //
import { MacAddressDTO } from "../dto";

//* Mongoose //
import { Model, Types } from 'mongoose';

//* Interface //
import { MacAddressInterface } from "../interface";

@Injectable( )
export class MacAddressService {

    constructor(

        @Inject( 'MAC_ADDRESS' )
        private readonly _MAC_ADDRESS: Model<MacAddressInterface>
        
     ) { }

    public async postMacs ( _macAddress: MacAddressDTO[] ): Promise<Array<Types.ObjectId>> {

        let IDs: Array<Types.ObjectId> = [ ];

        for ( const { macAddress } of _macAddress ) {

            //* const exist = this._MAC_ADDRESS.findOne( { macAddress } );

            const new_macAdressInstance = new this._MAC_ADDRESS( { macAddress } );
            await new_macAdressInstance.save( );
            IDs = [ ...IDs, new_macAdressInstance[ '_id' ] ];
            
        };
        
        return IDs;

    };

}