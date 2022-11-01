/* eslint-disable prettier/prettier */
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//* passport //
import { PassportStrategy } from '@nestjs/passport';

//* Mongoose //
// import { Model } from 'mongoose';

//* jwt //
import { Strategy, ExtractJwt } from 'passport-jwt';

Injectable( )
export class JWTStrategyService extends PassportStrategy( Strategy ) {

    constructor( 

        // private readonly configService: ConfigService,

    ) {
        super( {

            // secretOrKey: configService.get( 'SECRET_KEY' ),
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken( ),
            secretOrKey: 'NO_LE_PONGAS_HOSPITAL_A_LA_BASE_DE_DATOS_TAVO'

        } )      
    }

    //* Once token is correct ( in backgound ) data pass for this function //
    public async validate( { userID } ): Promise<boolean> {

       return userID;
    
    };

}