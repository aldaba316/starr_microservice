import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Types } from 'mongoose';
import { GetUserID } from "../decorator";

export class UserIdObjectDTO {
    
    //! userID //
    @Validate( GetUserID )
    @ApiProperty( {

        name:'userID ',
        type: 'string',
        description: 'User ID',
        example: '62ed6ecd9a326ac087bbf922'

    } )
    @IsNotEmpty( )
    @IsMongoId( )
    userID: Types.ObjectId;

};

export class UserIdArrayDTO {

    //! _users //
    @ApiProperty( {
        name:'_users',
        type: 'Array',
        description: '_users',
        example: "[ { userID: '62ed6ecd9a326ac087bbf922' } ]"
    
    } )
    @IsNotEmpty( )
    @IsArray( )
    @ValidateNested( { each: true } )
    @ArrayMinSize( 1 )
    @Type( ( ) => UserIdObjectDTO )
    _users: UserIdObjectDTO[ ]

}
