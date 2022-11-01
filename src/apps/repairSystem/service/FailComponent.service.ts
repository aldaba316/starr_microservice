import { Injectable, Inject, NotFoundException } from "@nestjs/common";

//* Mongoose //
import { Types, Model } from 'mongoose';
import { updateHeader } from "../../shared/global/updateHeader";

//* Interface // 
import { FailComponentInterface, FailComponentPagination } from "../interface/FailComponent.interface";

//* DTO //  
import { FailComponentDTO } from "../dto/FailComponent.dto";

@Injectable( )
export class FailComponentService {
    
    constructor(

        @Inject( 'FailComponent' ) 
        private readonly failComponentInterface: Model<FailComponentInterface>

     ) { }

    //! POST FailComponent //
    public async create( FailComponentDTO: FailComponentDTO ): Promise<FailComponentInterface> {
            
        const data = new this.failComponentInterface( FailComponentDTO );
        return await data.save( );

    };

     //! GET FailComponents by componentName Autocomplete //
     public async findAll_autocompleteByName ( value: string ) : Promise<any> {

        const data = await this.failComponentInterface.aggregate([
            { $addFields: { fullString: { $concat: ["$componentName"] } } },
            { $match: { fullString: { $regex: value } } }
        ]);
    
        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
        
        return data;

    };

    //! GET all FailComponents // 
    public async findAll( from = 0, limit = 5 ): Promise<FailComponentPagination> {

        const query = { active: true };

        const [ total, components ] = await Promise.all([
    
            this.failComponentInterface.countDocuments(query),
            this.failComponentInterface.find(query)
                    .skip( Number( from ) )
                    .limit( Number( limit ) )
                    
        ]);
    
        if ( !components.length ) 
            throw new NotFoundException( `Data not found` );
    
        return { total, components };

    };

    //! GET FailComponent by _id //
    public async findOne ( _id: Types.ObjectId ): Promise<FailComponentInterface> {

        const data = await this.failComponentInterface.findById( _id );
    
        if ( !data ) 
                throw new NotFoundException( `FailComponentID ${ _id } not found` );

        if ( !data.active ) 
            throw new NotFoundException( `FailComponentID ${ _id } not longer exist` );

        return data;
     

    };

    //! GET FailComponent by componentName //
    public async findOneByName ( componentName: string ): Promise<FailComponentInterface> {
            
        const data = await this.failComponentInterface.findOne( { componentName } );
            
        if ( !data ) 
            throw new NotFoundException( `componentName ${ componentName } not found` );
            
        return data;
                    
    };

      //! GET FailComponent by componentName Decorator //
      public async findOneByName_decorator ( componentName: string ): Promise<string> {
            
        const data = await this.failComponentInterface.findOne( { componentName } );
            
        if ( data ) 
            throw new NotFoundException( `componentName ${ componentName } already exist` );
            
        return 'Go ahead';
                    
    };

    //! PATCH FailComponent //
    public async updateOne ( { componentName }: FailComponentDTO, _id: Types.ObjectId ): Promise<FailComponentInterface> {

        const data = await this.failComponentInterface.findByIdAndUpdate( _id, { componentName }, updateHeader );

        if ( !data )
            throw new NotFoundException( `Data not updated` );

        return data;

    };

    //! DELETE FailComponent //
    public async deleteOne ( _id: Types.ObjectId ): Promise<FailComponentInterface> {
            
        const data = await this.failComponentInterface.findByIdAndUpdate( _id, { active: false } );

        if ( !data )
            throw new NotFoundException( `Data not deleted` );

        data.active = false;

        return data;

    };

}