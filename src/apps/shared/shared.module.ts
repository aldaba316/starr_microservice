import { Module } from "@nestjs/common";

import * as srv from './service';

import * as I from './interface';

import * as S from './schema';
import { MongoConnectionService } from "../../mongo-connection/mongo-connection.service";

import { MongoConnectionModule } from "../../mongo-connection/mongo-connection.module";

@Module( {

    providers: [ 

        srv.NodeService,

        {
            provide: 'NODE',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.NodeInterface>( 'NODE', S.NodeSchema, 'NODE' ),
            inject : [ MongoConnectionService ]
        },

     ],

     imports: [

        MongoConnectionModule

     ],
     exports : [

        srv.NodeService

     ]

} )

export class sharedModule {  }