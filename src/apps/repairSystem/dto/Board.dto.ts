 import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { GetBoardName } from "../decorator";

export class BoardDTO {

    //! boardName //
    @Validate( GetBoardName )
    @ApiProperty( {

        name:'boardName',
        type: 'string',
        description: 'Board Name',
        example: 'Board 1'

    } )
    @IsNotEmpty( )
    @IsString( )
    boardName: string;

    //! boardNodes //
    @ApiProperty( {

        name:'boardNodes',
        type: 'number',
        description: 'Board Nodes',
        example: '631 Nodes'

    } )
    @IsNotEmpty( )
    @IsNumber( )
    boardNodes: number;

};