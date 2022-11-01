import { Injectable } from "@nestjs/common";

//* Mongoose //
import { Types } from 'mongoose';

@Injectable( )
export class MainService {

    public async _validMongoID ( _id: string ): Promise<string> {

        return new Promise( ( resolve, reject ) => {

            ( !_id.match(/^[0-9a-fA-F]{24}$/) ) 
                ? reject ( `Invalid MongoID ${ _id }` )
                : resolve ( 'success' );

        });

    };

    //! value no repeated in array //
    public async repeatedIdInArray( _array, _id: Types.ObjectId ): Promise<string> {  

        return new Promise( ( resolve, reject ) => {

            if ( !_array.length ) 
                resolve( 'Empty array...' );

            const found = _array.find( ( id: Types.ObjectId ) =>  id == _id );

            if ( found )
                reject( `_id already exist in the array` );

            resolve( 'Here we go...' );

        });

    }

}