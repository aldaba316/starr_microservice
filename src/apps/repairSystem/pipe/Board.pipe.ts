
import { ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { BoardService } from "../service";

@Injectable( )
export class BoardIDPipe implements PipeTransform<string> {

    constructor (

        private readonly boardService: BoardService

     ) {}

  async transform( value ): Promise<string> {

    await this.boardService.findOne( value )

    return value;
  
  };
}
