import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MongoConnectionService {

    private dbConnection: Connection;

    constructor( 
        private configservice: ConfigService,
        private loggerService: LoggerService
        ) {

        this.createConnection( );

    }

    async createConnection ( ) {

        const host = this.configservice.get( 'mongo.host' );
        const port = this.configservice.get( 'mongo.port' );
        const database = this.configservice.get( 'mongo.database' );
        // const runnin_port = this.configservice.get( 'mongo.runnin_port' );

        const DB_URI = `mongodb://${ host }:${ port }/${ database }`;

        this.dbConnection = await createConnection( DB_URI );
        this.dbConnection.once( 'open', ( ) => this.loggerService.log( JSON.stringify( { method: `${ database }`, payload:'connection open', api:'createConnection' } ) ) );
        this.dbConnection.once( 'error', ( error ) => this.loggerService.error( JSON.stringify( { method: 'DB_connect', payload:`${ error } Error connecting to ${ database }`, api:'createConnection' } ) ) );

    };

    
    getConnection( ): Connection {

        return this.dbConnection;

    };

}
