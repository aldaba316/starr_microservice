import { Injectable } from "@nestjs/common";
import { NodeService } from '../../../apps/shared/service';

import * as D from '../dto';

@Injectable( )

export class ValidatorHelperService { 

    constructor(

        private readonly nodeService: NodeService

    ) { } 

    public async findAll_quickTestValidator ( array_ssnDTO: D.array_ssnDTO, template: Array<string> ) {

        let payload = [ ];

        const response = await this.nodeService.findAll_array( array_ssnDTO );

        for ( const iterator of response ) {

            if ( iterator.ok ) {

                const promises = await Promise.allSettled( this.getValidations ( template, iterator ) );

                const errors = await this.returnErrors( promises );

                errors[ 'SSN' ] = iterator.SSN;
                payload = [ ...payload, errors ];

            } else payload = [ ...payload, iterator ];
            
        };
        
        return payload;

    };

    public getValidations ( template : Array<string>, iterator ) {

        return template.map( ( value ) => this.validateTest( iterator.node[ value ], value ) )

    }

    public async returnErrors ( data ) {

        const errors = data.reduce( ( filtered, option ) => {

            if ( option.status == 'rejected' ) {

                filtered = [ ...filtered, option.reason ]

            };

            return filtered;

          }, [ ] );

        return { errors, ok: errors.length ? false : true };

    }

    public async validateTest ( arrayTest, testString: string ): Promise<any> {

        return new Promise( ( resolve, reject ) =>{

            if ( !arrayTest.length ) 
                reject ( `Logs not found for the test ${ testString }` )

            const lastLog = arrayTest.at( -1 );

            ( lastLog.strStatus == 'PASS' )
                ? resolve( 'Go ahead' )
                : reject ( `LastLog FAIL for the test ${ testString }` )

        });

    };

 }