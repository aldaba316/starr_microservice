
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';

//* DTO // 
import { ErrorCodeDTO } from '../dto/ErrorCode.dto';

//* Interface //
import { ErrorCodeInterface, ErrorCodePagination } from '../interface/';

//* Mongoose //
import { Types, Model } from 'mongoose';
import { updateHeader } from '../../shared/global/updateHeader';

@Injectable( )
export class ErrorCodeService {

    constructor(

        @Inject( 'ErrorCode' ) 
        private readonly errorCodeInterface: Model<ErrorCodeInterface>

     ) {  } 

     //! POST ErrorCode //
    public async create( ErrorCodeDTO: ErrorCodeDTO ): Promise<ErrorCodeInterface> {
            
        const data = new this.errorCodeInterface( ErrorCodeDTO );

        return await data.save( );

    };

    //! GET all ErrorCodes //
    public async findAll( from = 0, limit = 5 ): Promise<ErrorCodePagination> {

        const query = { active: true };

        const [ total, codes ] = await Promise.all([

            this.errorCodeInterface.countDocuments(query),
            this.errorCodeInterface.find(query)
                .skip( Number( from ) )
                .limit( Number( limit ) )
                    
        ]); 

        if ( !codes.length ) 
            throw new NotFoundException( `Data not found` );

        return { total, codes };

    };

     //! GET ErrorCodes by description Autocomplete //
     public async findAll_autocompleteByDescription ( value: string ) : Promise<any> {

        const data = await this.errorCodeInterface.aggregate([
            { $addFields: { fullString: { $concat: ['$description'] } } }, 
            { $match: { fullString: { $regex: value } } }
        ]);
    
        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
        
        return data;

    };

    //! GET ErrorCode by _id //
    public async findOne ( _id: Types.ObjectId ): Promise<ErrorCodeInterface> {

        const data = await this.errorCodeInterface.findById( _id );
    
        if ( !data ) 
            throw new NotFoundException( `ErrorCode _id ${ _id } not found` );

        if ( !data.active ) 
            throw new NotFoundException( `ErrorCode _id ${ _id } not longer exist` );

        return data;

    };

    //! GET ErrorCode by code //
    public async findOneByCode ( code: number ): Promise<ErrorCodeInterface> {

        const data = await this.errorCodeInterface.findOne( { code } );
            
        if ( !data )
            throw new NotFoundException( `code ${ code } not found` );
              
        return data;
                    
    };

    //! GET ErrorCode by code, decorator //
    public async findOneByCode_decorator ( code: number ): Promise<string> {

        const data = await this.errorCodeInterface.findOne( { code } );
            
        if ( data )
            throw new NotFoundException( `code ${ code } already exist` );
              
        return 'Go ahead';
                    
    };

    //! PATCH ErrorCode //
    public async updateOne ( { code, description }: ErrorCodeDTO, _id: Types.ObjectId ): Promise<ErrorCodeInterface> {

        const data = await this.errorCodeInterface.findByIdAndUpdate( _id, { code, description }, updateHeader );

        if ( !data )
            throw new ConflictException( `Data not updated` );

        return data;
        
    };

    //! DELETE ErrorCode //
    public async deleteOne ( _id: Types.ObjectId ): Promise<ErrorCodeInterface> {
            
        const data = await this.errorCodeInterface.findByIdAndUpdate( _id, { active: false } );

        if ( !data )
            throw new ConflictException( `Data not deleted` );

        data.active = false;

        return data;
        
    };

}