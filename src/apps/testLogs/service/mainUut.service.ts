
import { ConflictException, Injectable, Inject } from "@nestjs/common";

//* DTO //
import { UutLogsDTO } from "../dto";

//* Interface //
import { UutLogInterface } from "../interface";

//* Mongoose //
import { Model, Types } from 'mongoose'; 

//* Service //
import { MacAddressService } from "./";
import { NodeService } from "../../../apps/shared/service";

@Injectable( )

export class MainUUTService {

    constructor(

        //* Mongoosee //
        @Inject( 'QuickTest' )
        private readonly _QuickTest: Model<UutLogInterface>,

        @Inject( 'FunctionalTest' )
        private readonly _FunctionalTest: Model<UutLogInterface>,

        @Inject( 'StressTest' )
        private readonly _StressTest: Model<UutLogInterface>,

        private readonly MacAddressService : MacAddressService,
        private readonly nodeService: NodeService

     ) { }

    public async findOne_strTestLog( strTestLog: string, strFolder: string ): Promise<string> {

        const strTestLog_exist = await this[ strFolder ].findOne( { strTestLog } );

        if ( strTestLog_exist ) 
                throw new ConflictException( `strTestLog ${ strTestLog } already exist` );
        
        return 'Go ahead';

    }

    public async _postUutLog( UutLogsDTO : UutLogsDTO ): Promise<any> {

        await this.findOne_strTestLog( UutLogsDTO.strTestLog, UutLogsDTO.strFolder );

        //? Save macs and get ID's //
        UutLogsDTO['_macAddress'] = await this.MacAddressService.postMacs( UutLogsDTO._macAddress_ );

        //? New Mongo UutLog instance //
        const data = new this[ UutLogsDTO.strFolder ]( UutLogsDTO );

        const [ response, node ] = await Promise.all( [

            data.save( ),
            this.nodeService.createFindOne( UutLogsDTO.strSerialNode, UutLogsDTO.strAssetTagNode )

        ] );

        await this.nodeService.updateOne_pushTest( node[ '_id' ], UutLogsDTO.strFolder, data[ '_id' ] );

        return response;

    };

}