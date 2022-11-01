import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SendAttributeDataSubAssyDTO } from '../dto';
import { postOptions, sendAttributeDataURL } from '../../shared/global/postRequest.constants';
import { PostRequestService } from '../../shared/global/postRequest.service';
import { CygnusResponseService } from './CygnusResponse.service';
import { NodeService } from '../../../apps/shared/service';
import { DataSubAssyObjI } from '../interface';

@Injectable( )

export class DataSubAssyService {

    constructor(

        @Inject( 'DataSubAssy' )
        private readonly DataSubAssyI: Model<DataSubAssyObjI>,
        private readonly postRequestService: PostRequestService,
        private readonly cygnusResponseService: CygnusResponseService,
        private readonly nodeService: NodeService

     ) { }

    public async create ( sendAttributeDataSubAssyDTO: SendAttributeDataSubAssyDTO ): Promise<any> {

        await this.findOne_TESTLOG( sendAttributeDataSubAssyDTO.sendAttributeDataSubAssy[ 0 ].TESTLOG );

        postOptions[ 'url' ] = sendAttributeDataURL;
        postOptions[ 'body' ] =  JSON.stringify( sendAttributeDataSubAssyDTO );  

        const cygnusResponse =  JSON.parse( await this.postRequestService.postRequest( postOptions ) );

        const create_cygnusResponse = await this.cygnusResponseService.create( cygnusResponse );

        sendAttributeDataSubAssyDTO.sendAttributeDataSubAssy[ 0 ][ '_cygnusResponse' ] = create_cygnusResponse[ '_id' ];

        const data = new this.DataSubAssyI( sendAttributeDataSubAssyDTO.sendAttributeDataSubAssy[ 0 ] );

        const node = await  this.nodeService.createFindOne( sendAttributeDataSubAssyDTO.sendAttributeDataSubAssy[ 0 ].SERIALNO, sendAttributeDataSubAssyDTO.sendAttributeDataSubAssy[ 0 ].ASSET_TAG );

        const [ , response ] = await Promise.all( [

            await this.nodeService.updateOne_DataSubAssy( node[ '_id' ], data[ '_id' ] ),
            data.save( )

        ] );

        return response;

    };

    public async findOne_TESTLOG( TESTLOG: string ): Promise<string> {

        const data = await this.DataSubAssyI.findOne( { TESTLOG } );

        if ( data )
            throw new ConflictException( `TESTLOG ${ TESTLOG } already exist` );
        
        return 'Go ahead';
            
    };

};