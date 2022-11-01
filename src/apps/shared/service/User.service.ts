import { Injectable, NotFoundException } from "@nestjs/common";

import { Types } from 'mongoose';
import { firstValueFrom } from "rxjs";

//* Microservice //
import { MicroserviceConnectionService } from "../../../microservice-connection/microservice-connection.service";


@Injectable( )
export class UserService {

    constructor (

        private readonly microservice: MicroserviceConnectionService

     ) { }

     public async validateGatewayUser(  token: string, socketID: string ) {

        return new Promise( async ( resolve, reject ) =>{

            try {
        
                const response = await firstValueFrom( 
                    this.microservice.getClient( 'user_microservice' )
                                     .send( 'validateGatewayUser', { token, socketID } ) );

                resolve( response );
                
            } catch ( error ) {
                
                reject( error );
                
            };

        });

     }

     
     public async updateUser_custom( repairID: Types.ObjectId, userID: Types.ObjectId, event: string ): Promise<string> {

        return new Promise( async ( resolve, reject ) => {

            try {
    
                const data = await firstValueFrom( 
                    this.microservice.getClient( 'user_microservice' )
                                     .send( event, { repairID, userID } ) );

                if ( data.ok ) {

                    const { resp } = data;
                    resolve( resp );
                    
                };

                reject( data.message );
    
            } catch ( { errno, code, syscall, address, port } ) {
                
                reject( { errno, code, syscall, address, port } );
                
            };

        });

     }

     //! Validate user that comes from request //
     public async _validateUserFromToken( { socketID, active }: any ): Promise<string> {

        return new Promise( ( resolve, reject ) => {

            if ( !socketID ) 
                reject( `User not Online` );

            if ( !active ) 
                reject( `User not active` );

        });

     };

     //! User must have a specific role //
     public async _hasRole( { _roles }: any, incomingRole: string ): Promise<string> {

        return new Promise( ( resolve, reject ) => {

            if ( !_roles.length ) 
                reject( 'User need a role' );

            const validRole = _roles.find( ( { role } ) => {
                
                if( role == incomingRole )
                    return role
                
            } );
            
            ( validRole )
                ? resolve( 'Here we go' )
                : reject ( 'User need a valid role' )
              
        });

     }
    
    //! GET User by _id //
    public async _getUser ( _id: Types.ObjectId ): Promise<any> {

        const data = await firstValueFrom( this.microservice.getClient( 'user_microservice' ).send( '_getUser', _id ) );

        if ( data.ok ) {

            const { user } = data;
            return user;
                            
        };
        
        throw new NotFoundException( data.message );

    };

    //! Tech repair must belong to this Board //
    public async userBelongToBoard( { techRepair }, techRepairID: Types.ObjectId ): Promise<string> {

        return new Promise( ( resolve, reject ) =>{

            const belong = techRepair.find( ( tech ) => tech[ '_id' ] == techRepairID );

            ( belong )
                ? resolve( 'Here we go' )
                : reject( 'This user does not belong to this Board' );

        });

    };

     //! socketID must not be null //
    public async assignToConnected ( assignToSocket: string ): Promise<string> {

        return new Promise( ( resolve, reject ) => {

            if ( assignToSocket ) 
                resolve( 'Here we go' );

            reject( `User not Online ${ assignToSocket }` );
            
        });

    };

}