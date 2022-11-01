import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString, MinLength, Validate } from 'class-validator';
import * as D from '../decorator';
import { Types } from 'mongoose';

export class CloseRepairDTO {

    //! _componentRepaired //
    @Validate( D.GetFailComponentID )
    @ApiProperty( {

        name:'_componentRepaired',
        type: 'ObjectId',
        description: 'Component Repaired',
        example: '62defd014d0ab6c7d0cd5594'

    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _componentRepaired: Types.ObjectId;

     //! actionTaked //
     @Validate( D.RepairActions )
     @ApiProperty( {

        name:'actionTaked',
        type: 'string',
        description: 'Action Taked',
        example: 'Replace'

    } )
    @IsNotEmpty( )
    @IsString( )
    actionTaked: string;

    //! RepairAnalisis //
    @ApiProperty( {

        name:'RepairAnalisis',
        type: 'string',
        description: 'Repair Analisis',
        example: 'Replace'

    } )
    @IsNotEmpty( )
    @IsString( )
    RepairAnalisis: string;

};

export class CloseRepairReplaceDTO extends CloseRepairDTO {
 
    //! oldCT //
    @ApiProperty( {

        name:'oldCT',
        type: 'string',
        description: 'Old CT',
        example: 'Old CT test'

    } )
    @IsNotEmpty( )
    @IsString( )
    oldCT: string;

     //! newCT //
     @ApiProperty( {

       name:'newCT',
       type: 'string',
       description: 'New CT',
       example: 'New CT test'

   } )
   @IsNotEmpty( )
   @IsString( )
   newCT: string;


};

export class RepairDTO {

    //! SSN //
    //? Repairs should no be repeated //
    @Validate( D.ActiveRepair )
    @ApiProperty( {
        name:'SSN',
        type: 'string',
        description: 'SSN',
        example: 'MXX1234567'
    } )
    @IsNotEmpty( )
    @IsString( )
    SSN: string;

     //! position //
     @ApiProperty( {
        name:'position',
        type: 'string',
        description: 'position',
        example: '1-2-1'
    } )
    @IsNotEmpty( )
    @IsString( )
    position: string;

    //! _board //
    //? Board must exist //
    @Validate( D.GetBoardID )
    @ApiProperty( {
        name:'_board',
        type: 'ObjectId',
        description: 'board ID',
        example: '62e28cb7f76653dcb7354ba3'
    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _board: Types.ObjectId;

    //! _assignTo //
    //? User must exist //
    @Validate( D.GetUserID )
    //? User must be connected //
    // @Validate( D.UserMustBeConnected )
    @ApiProperty( {
        name:'_assignTo',
        type: 'ObjectId',
        description: '_assignTo',
        example: '62e28cb7f76653dcb7354ba3'
    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _assignTo: Types.ObjectId;

    //! shift //
    //? Must be a valid shift //
    @Validate( D.ValidShift )
    @ApiProperty( {
        name:'shift',
        type: 'string',
        description: 'Shift',
        example: '1st'
    } )
    @IsNotEmpty( )
    @IsString( )
    shift: string;

    //! _errorCode //
    //? Error code must exist //
    @Validate( D.GetErrorCodeID )
    @ApiProperty( {
        name:'_errorCode',
        type: 'ObjectId',
        description: 'failComponent ID',
        example: '62e28cb7f76653dcb7354ba3'
    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _errorCode: Types.ObjectId;

    //! _runningTest //
    //? Running Test must exist //
    @Validate( D.GetRunningTestID )
    @ApiProperty( {
        name:'_runningTest',
        type: 'ObjectId',
        description: 'RunningTestID',
        example: '62e28cb7f76653dcb7354ba3'
    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _runningTest: Types.ObjectId;

    //! action //
    //? Must be a valid action //
    @Validate( D.RepairActions )
    @ApiProperty( {
        name:'action',
        type: 'string',
        description: 'action',
        example: 'Reinsert'
    } )
    @IsNotEmpty( )
    @IsString( )
    action: string; 

    //! techAnalisis //
    @ApiProperty( {
        name:'techAnalisis',
        type: 'string',
        description: 'techAnalisis',
        example: 'Se quemo el procesador'
    } )
    @IsNotEmpty( )
    @IsString( )
    @MinLength( 10 )
    techAnalisis: string;

     //! priority //
     //? Must be a valid Priority //
     @Validate( D.RepairPriority )
     @ApiProperty( {
        name:'priority',
        type: 'number',
        description: 'priority',
        example: 1
    } )
    @IsNotEmpty( )
    @IsNumber( )
    priority: number;

     //! _family //
     //? Family must exist //
     @Validate( D.GetFamilyID )
     @ApiProperty( {
        name:'_family',
        type: 'ObjectId',
        description: '_family ID',
        example: 1
    } )
    @IsNotEmpty( )
    @IsMongoId( )
    _family: Types.ObjectId;

};