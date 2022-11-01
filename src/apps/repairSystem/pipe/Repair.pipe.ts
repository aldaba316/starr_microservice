
import { ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable( )
export class OpenCloseRepairPipe implements PipeTransform<string> {

  transform( value: string ): string {
      
      const arrayFilter: Array<string> = [ '_assignTo', '_generatedBy' ];

        if ( !arrayFilter.includes( value ) ) 
                throw new ConflictException( `Filter must be ${ arrayFilter }` );

        return value;
  
  };
}

export class statusRepairPipe implements PipeTransform<string> {

  transform( value: string ): string {
      
      const arrayFilter: Array<string> = [ 'open', 'close' ];

        if ( !arrayFilter.includes( value ) ) 
                throw new ConflictException( `Filter must be ${ arrayFilter }` );

        return value;
  
  };
}