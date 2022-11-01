import { Injectable, Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { CygnusResponseI } from '../interface';

@Injectable( )
export class CygnusResponseService {

    constructor(

        @Inject( 'CygnusResponse' )
        private readonly CygnusResponseI: Model<CygnusResponseI>,

     ){ }

     public async create ( response: CygnusResponseI ): Promise<CygnusResponseI> {

        const data = new this.CygnusResponseI( response );

        return await data.save( );

     };

}