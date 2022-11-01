/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ConflictException, Injectable, Inject } from "@nestjs/common";

//* DTO //
import { FailsDTO } from "../dto";

//* Interface //
import { FailsInterface } from "../interface";

//* Mongoose //
import { Model } from 'mongoose';

//* Require library
const xl = require('excel4node');

Injectable( )
export class FailsService {

    constructor (

        @Inject( 'FAILS' )
        private failsInstance: Model<FailsInterface>

    ) { }

    public async _postFail ( { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis }: FailsDTO ): Promise<FailsInterface> {

        try {

            const exist_strTestlog = await this.failsInstance.findOne( { strTestlog } );

            if ( exist_strTestlog ) 
                throw new ConflictException( `strTestlog ${ strTestlog } already exist` );

            const data = new this.failsInstance( { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis } );
            await data.save( );

            return data;

        } catch ( error ) {

            throw new ConflictException(  error.response ? error.response.message : error );

        };
        
    };

    public async _getFails( ): Promise<FailsInterface[ ]> {

        return await this.failsInstance.find( );

    };

    public async createExcelFile( fails: FailsInterface[ ] ): Promise<Array<any>> {

        try {

            const counter = { };

            const path = '/home/roo/developshare/Omar/starr_microservice/src/apps/testLogs/files/';
            
            //* Create a new instance of a Workbook class //
            const wb = new xl.Workbook( { author: 'FoxCode PRO' } );
            
            //* Add Worksheets to the workbook //
            const ws = wb.addWorksheet('Sheet 1');

            //* Set headers values //
            ws.cell( 1, 1 ).string('strSSN');
            ws.cell( 1, 2 ).string('strTestlog');
            ws.cell( 1, 3 ).string('strFolder');
            ws.cell( 1, 4 ).string('strFailDescription');
            ws.cell( 1, 5 ).string('strErrorCode');
            ws.cell( 1, 6 ).string('strSerialChassis');

            //* Set data //
            for ( let index = 0; index < fails.length; index++ ) {

                const desc = fails[ index ].strFailDescription;

                counter[ desc ] = !counter[ desc ] ? 1 : counter[ desc ] += 1;

                ws.cell([ index + 2 ], 1).string( fails[ index ].strSSN );
                ws.cell([ index + 2 ], 2).string( fails[ index ].strTestlog );
                ws.cell([ index + 2 ], 3).string( fails[ index ].strFolder );
                ws.cell([ index + 2 ], 4).string( fails[ index ].strFailDescription );
                ws.cell([ index + 2 ], 5).string( fails[ index ].strErrorCode );
                ws.cell([ index + 2 ], 6).string( fails[ index ].strSerialChassis );
                
            };

            //* Group and sort data //
            const sorted = Object.keys( counter )
                           .map( data => ( { strFailDescription: data, times : counter[ data ] } ))
                           .sort ( ( a, b ) => b.times - a.times )

            //* Save File //
            wb.write( `${ path }starrReport.xlsx` );

            return sorted;

        } catch ( error ) {

            console.log( error );
            throw new ConflictException(  error.response ? error.response.message : error );

        }

    };

    public async _getReport( ): Promise<Array<any>> {

        try {

            const fails = await this._getFails( );

            return await this.createExcelFile( fails );
            
        } catch ( error ) {

            console.log( error );
            throw new ConflictException(  error.response ? error.response.message : error );

        }

    };

}