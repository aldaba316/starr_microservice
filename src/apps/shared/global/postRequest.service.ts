/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const request = require('request');

@Injectable( )
export class PostRequestService {    

    public async postRequest( options ): Promise<any> {

        return new Promise( ( resolve ) => {

            request( options, ( error, { body } ) => {   
                    
                if ( error ) {
    
                    resolve( error ) 
    
                }   
    
                resolve( body ) 
    
            } );

        })
  
    }

}