import { Module } from '@nestjs/common';

import * as ctrl from './controller';
import * as srv from './service';
import { PostRequestService } from '../shared/global/postRequest.service';
import * as I from './interface';
import * as S from './schema';
import { MongoConnectionService } from '../../mongo-connection/mongo-connection.service';
import { MongoConnectionModule } from '../../mongo-connection/mongo-connection.module';
import { sharedModule } from '../shared/shared.module';
import { NodeInterface } from '../shared/interface/node.interface';
import { NodeSchema } from '../shared/schema/node.schema';

@Module( {

    controllers: [

        ctrl.DataAssyController,
        ctrl.DataSubAssyController

    ],
    providers: [ 

        PostRequestService,
        srv.DataAssyService,
        srv.CygnusResponseService,
        srv.DataSubAssyService,

        {
            provide: 'DataAssy',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.DataAssyObjI>( 'DataAssy', S.DataAssyObjSchema, 'DataAssy' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'DataSubAssy',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.DataSubAssyObjI>( 'DataSubAssy', S.DataSubAssySchema, 'DataSubAssy' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'CygnusResponse',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.CygnusResponseI>( 'CygnusResponse', S.CygnusResponseSchema, 'CygnusResponse' ),
            inject : [ MongoConnectionService ]
        }

     ],
     imports: [

        MongoConnectionModule,
        sharedModule

     ]

} )

export class foxApi_V2Module { }