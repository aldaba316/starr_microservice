import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SendAttributeDataAssyDTO } from '../dto';
import { DataAssyObjI } from '../interface';
import { postOptions, sendAttributeDataURL } from "../../shared/global/postRequest.constants";
import { PostRequestService } from '../../shared/global/postRequest.service';
import { CygnusResponseService } from './CygnusResponse.service';
import { NodeService } from '../../../apps/shared/service';

@Injectable( )
export class DataAssyService {

    constructor(

        @Inject( 'DataAssy' )
        private readonly DataAssyObjI: Model<DataAssyObjI>,

        private readonly postRequestService: PostRequestService,
        private readonly cygnusResponseService: CygnusResponseService,
        private readonly nodeService: NodeService

     ) { }

    public async create ( SendAttributeDataAssyDTO: SendAttributeDataAssyDTO ): Promise<DataAssyObjI> {
 
        await this.findOne_TESTLOG( SendAttributeDataAssyDTO.sendAttributeDataAssy.TESTLOG );

        postOptions[ 'url' ] = sendAttributeDataURL;
        postOptions[ 'body' ] =  JSON.stringify( SendAttributeDataAssyDTO );  

        const cygnusResponse =  JSON.parse( await this.postRequestService.postRequest( postOptions ) );

        const create_cygnusResponse = await this.cygnusResponseService.create( cygnusResponse );
        
        SendAttributeDataAssyDTO.sendAttributeDataAssy[ '_cygnusResponse' ] = create_cygnusResponse[ '_id' ];

        const data = new this.DataAssyObjI( SendAttributeDataAssyDTO.sendAttributeDataAssy );

        const node = await  this.nodeService.createFindOne( SendAttributeDataAssyDTO.sendAttributeDataAssy.SERIALNO, SendAttributeDataAssyDTO.sendAttributeDataAssy.ASSET_TAG );

        const [ , response ] = await Promise.all( [

            await this.nodeService.updateOne_DataAssy( node[ '_id' ], data[ '_id' ] ),
            data.save( )

        ] );

        return response;

    };

    public async findOne_TESTLOG( TESTLOG: string ): Promise<string> {

        const data = await this.DataAssyObjI.findOne( { TESTLOG } );

        if ( data )
            throw new ConflictException( `TESTLOG ${ TESTLOG } already exist` );
        
        return 'Go ahead';
            
    };


}