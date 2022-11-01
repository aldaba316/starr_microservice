/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";

import { Types } from 'mongoose';

@Injectable( )
export class SharedService {

    constructor() {}

    public async _validMongoID ( _id: any ): Promise<string> {

        return new Promise( ( resolve, reject ) => {

            ( !_id.match(/^[0-9a-fA-F]{24}$/) ) 
                ? reject ( `Invalid MongoID ${ _id }` )
                : resolve ( 'success' );

        });

    }

}