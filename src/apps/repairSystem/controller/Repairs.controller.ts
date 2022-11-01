
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

//* DTO //
import { RepairDTO, CloseRepairReplaceDTO, CloseRepairDTO } from '../dto';

//* Interface //
import { OpenRepairInterface, OpenRepairPagination } from '../interface';

//* Service //
import { OpenRepairService } from '../service';
import { UserService } from '../../shared/service/User.service';

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from '../../../common/decorator';

//* Roles //
import { validRoles } from '../../shared/global/valid-roles';

//* Pipes ( local/ global ) //
import { OpenCloseRepairPipe, statusRepairPipe } from '../pipe';
import { GetUserIDPipe, ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/repairs' )
@ApiTags( 'Repairs' )
export class RepairsController {

    constructor(

        private readonly openRepairService: OpenRepairService,
        private readonly userService: UserService

    ) { }

     //! Open Repair //
     @Auth(  
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation({
        description: 'POST Open Repair',
    })
    @ApiBody({
        description: 'Data example',
        type: RepairDTO,
        examples: {
          ejemplo1: {
            value: {

                SSN: '123',
                position: '1-2-3',
                _board: '62ed6ecd9a326ac087bbf922',
                shift: '1st',
                _runningTest: '62e28cb7f76653dcb7354ba3',
                _errorCode: '62e28cb7f76653dcb7354ba3',
                action: 'Reinsert',
                techAnalisis: 'Esto es el comentario de tecnico',
                priority: 1,
                _family: '62e28cb7f76653dcb7354ba3',
                _assignTo: '62e28cb7f76653dcb7354ba3'

            }
          }
        }
    })
    @Post( '/openRepair' )
    public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Body( ) RepairDTO: RepairDTO ): Promise<OpenRepairInterface> {

        const user: any = await this.userService._getUser( userID );
        return await this.openRepairService.create( RepairDTO, user );

    }; 

    //! GET ALL open/close Repairs // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ],
        validRoles[ 'starr-repairSystem-user-repairer' ],
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all Open/Close repairs',
    })
    @ApiQuery( {
      name:'from',
      type: Number,
      description: 'From which position',
      required: false
    } )
    @ApiQuery( {
          name:'limit',
          type: Number,
          description: 'How many data',
          required: false
    } )
    @ApiQuery( { 
      name:'filter',
      type: String,
      description: 'open/close',
      required: true
    } )
    @Get( '/' )
    public async findAll( 
            @Query( 'from' ) from: number, 
            @Query( 'limit' ) limit: number,
            @Query( 'filter', statusRepairPipe ) filter: string, 
            @GetUserFromRequest( ) userID: Types.ObjectId,
            ): Promise<OpenRepairPagination> {

        return await this.openRepairService.findAll( from, limit, filter );
    
    };

     //! GET ALL Repairs by User / assing / generate // 
     @Auth( 
        validRoles.dev,
        validRoles['starr-repairSystem-user-repairer'] ,
        validRoles['starr-repairSystem-admin-repairer'] ,
        validRoles['starr-repairSystem-minion'] ,
        validRoles['starr-repairSystem-guru'] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all repairs by User ( assign, generate )',
    })
    @ApiQuery( {
      name:'from',
      type: Number,
      description: 'From which position',
      required: false
    } )
    @ApiQuery( {
          name:'limit',
          type: Number,
          description: 'How many data',
          required: false
    } )
    @ApiQuery( { 
      name:'filter',
      type: String,
      description: '_assignTo/_generatedBy',
      required: true
    } )
    @ApiQuery( { 
        name:'_userID',
        type: String,
        description: 'User ID',
        required: true
    } )
    @ApiQuery( { 
        name:'status',
        type: String,
        description: 'open/close',
        required: true
    } )
    @Get( '/byUser' )
    public async findAll_byUser( 
            @Query( 'from' ) from: number, 
            @Query( 'limit' ) limit: number,
            @Query( 'filter', OpenCloseRepairPipe ) filter: string, 
            @Query( 'status', statusRepairPipe ) status: string, 
            @Query( '_userID', ValidateMongoId, GetUserIDPipe ) _userID: Types.ObjectId, 
            @GetUserFromRequest( ) userID: Types.ObjectId): Promise<any> {
        
        return await this.openRepairService.findAll_byUser( from, limit, filter, _userID, status );
    
    };

    //! GET Repairs by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ],
        validRoles[ 'starr-repairSystem-user-repairer' ],
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Repair by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'Repair ID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<OpenRepairInterface> {

        return await this.openRepairService.findOne( _id );
        
    };

     //! GET Repairs by SSN //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ],
        validRoles[ 'starr-repairSystem-user-repairer' ],
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Repair by SSN',
    })
    @ApiQuery( {
        name:'SSN',
        type: String,
        required: true,
        description: 'Serial Number'
    } )
    @ApiQuery( {
        name:'limit',
        type: Number,
        description: 'How many data',
        required: false
    } )
    @ApiQuery( {
        name:'from',
        type: Number,
        description: 'From which position',
        required: false
    } )
    @Get( '/SSN' )
    public async findOneBySSN( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query( 'from' ) from: number, 
        @Query( 'limit' ) limit: number,
        @Query ('SSN' ) SSN: string ): Promise<OpenRepairPagination> {

        return await this.openRepairService.findOneBySSN( from, limit, SSN );

    };

     //*! GET Repairs by SSN but with autocomplete //
     @Auth( 
        validRoles.dev
    )
     @ResponseDecorator( )
     @ApiOperation( {
        description: 'GET Repair by SSN Autocomplete',
    })
    @ApiQuery( {
        name:'value',
        type: String,
        required: true,
        description: 'Searchig value'
    } )
    @Get( '/autocomplete' )
    public async findOne_autocompleteBySSN( 
        @GetUserFromRequest( ) userID: Types.ObjectId,  
        @Query ('value' ) value: string ): Promise<OpenRepairPagination> {

        return await this.openRepairService.findOne_autocompleteBySSN( value );
        
    };

    //! Close Repair ( Replace ) by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-user-repairer' ],
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Close Repair ( Replace ) by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: CloseRepairReplaceDTO,
        examples: {
            ejemplo1 : {
                value: {

                    _componentRepaired: '62f51eedfe4177ea3329dbdc',
                    actionTaked: 'Replace',
                    RepairAnalisis: 'Esto es el analisis del reparador',
                    oldCT: '123',
                    newCT: '456'

                }
            } 
        }
    } )
    @Patch( 'closeRepair/replace/:_id' )
    public async updateRepair_closeRepairReplace( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) closeRepairReplaceDTO: CloseRepairReplaceDTO 
    ): Promise<OpenRepairInterface> {

        return await this.openRepairService.updateRepair_closeRepairReplace( closeRepairReplaceDTO, _id );
        
    };

    //! Close Repair ( Not Replace ) by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-user-repairer' ],
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Close Repair ( Not Replace ) by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: CloseRepairDTO,
        examples: {
            ejemplo1 : {
                value: {

                    _componentRepaired: '62f51eedfe4177ea3329dbdc',
                    actionTaked: 'Reinsert',
                    RepairAnalisis: 'Esto es el analisis del reparador',

                }
            }
        }
    } )
    @Patch( 'closeRepair/:_id' )
    public async updateRepair_closeRepair( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) closeRepairDTO: CloseRepairDTO 
    ): Promise<OpenRepairInterface> {

        return await this.openRepairService.updateRepair_closeRepair( closeRepairDTO, _id );

    };

} 