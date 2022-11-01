/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";

//* Controller // 
import * as ctrl from "./controller";

//* Providers //
import * as srv from "./service";
import { JWTStrategyService } from '../../common/strategy/jwt-strategy.service';
import { AppGateway } from "../../app.gateway"; 

//* Schemas //
import * as S from "./schema/";

//* Interface //
import * as I from "./interface";

//* Decorator //
import * as D from './decorator';

//* OnGateway //
import * as G from './gateway';

//* MongoConnection //
import { MongoConnectionService } from "../../mongo-connection/mongo-connection.service";
import { MongoConnectionModule } from "../../mongo-connection/mongo-connection.module";

//* Login Strategy/ /
import { PassportModule } from "@nestjs/passport";

//* Config //
import { ConfigModule } from "@nestjs/config";

//* Global //
import { UserService } from "../shared/service/User.service";

@Module( {

    imports: [

        MongoConnectionModule,
        PassportModule.register( { defaultStrategy: 'jwt' } ),
        ConfigModule,

    ],  
    controllers: [

        ctrl.FamilyController,
        ctrl.ErrorCodeController,
        ctrl.FailComponentController,
        ctrl.WorkOrderController,
        ctrl.SkuController,
        ctrl.RunningTestController,
        ctrl.BoardController,
        ctrl.RepairsController

    ],
    providers: [

        srv.FamilyService,
        srv.MainService,
        srv.ErrorCodeService,
        srv.FailComponentService,
        srv.WorkOrderService,
        srv.SkuService,
        srv.MicroserviceConnectionService,
        srv.RunningTestService,
        srv.BoardService,
        srv.OpenRepairService,
        srv.RepairSolutionService,

        G.RepairGateway,

        D.GetFamilyDesc,
        D.ValidShift,
        D.RepairActions,
        D.RepairPriority,
        D.ActiveRepair,
        D.GetFamilyID,
        D.GetRunningTestID,
        D.GetErrorCodeID,
        D.GetBoardID,
        D.GetUserID,
        D.UserMustBeConnected,
        D.GetFailComponentID,
        D.GetBoardName,
        D.GetErrorCode,
        D.GetFailComponentName,
        D.GetRunningTest,
        D.GetSku,
        D.GetWorkOrder,

        JWTStrategyService,
        AppGateway,
        
        UserService,
        //! Collections Instance //
        {
            provide: 'Family',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.FamilyInterface>( 'Family', S.FamilySchema, 'Family' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'ErrorCode',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.ErrorCodeInterface>( 'ErrorCode', S.ErrorCodeSchema, 'ErrorCode' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'FailComponent',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.FailComponentInterface>( 'FailComponent', S.FailComponentSchema, 'FailComponent' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'WorkOrder',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.WorkOrderInterface>( 'WorkOrder', S.WorkOrderSchema, 'WorkOrder' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'Sku',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.SkuInterface>( 'Sku', S.SkuSchema, 'Sku' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'RunningTest',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.RunningTestInterface>( 'RunningTest', S.RunningTestSchema, 'RunningTest' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'Board',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.BoardInterface>( 'Board', S.BoardSchema, 'Board' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'Repair',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.OpenRepairInterface>( 'Repair', S.OpenRepairSchema, 'Repair' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'RepairSolution',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.RepairSolutionInterface>( 'RepairSolution', S.RepairSolutionSchema, 'RepairSolution' ),
            inject : [ MongoConnectionService ]
        }
    ],
    exports: [

        JWTStrategyService, PassportModule, UserService

     ] 

} )

export class RepairSystemModule { }