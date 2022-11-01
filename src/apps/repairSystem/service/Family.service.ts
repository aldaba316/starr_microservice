import { Injectable, Inject, NotFoundException } from "@nestjs/common";

//* DTO //
import { FamilyDTO } from "../dto";

//* Interface //
import { FamilyInterface, FamilyPagination } from "../interface";
 
//* Mongoose //
import { Types, Model } from 'mongoose'; 

//* Global //
import { updateHeader } from "../../shared/global/updateHeader";
 
@Injectable( )
export class FamilyService {

    constructor(

        @Inject( 'Family' ) 
        private readonly familyInstance: Model<FamilyInterface>,   

     ) { }

     //! POST FAMILY //
    public async create( FamilyDTO: FamilyDTO ): Promise<FamilyInterface> {

        const data = new this.familyInstance( FamilyDTO );
        return await data.save( );

    };

    //! GET ALL FAMILIES // 
    public async findAll ( from = 0, limit = 5 ): Promise<FamilyPagination> {

        const query = { active: true };

        const [ total, families ] = await Promise.all([
    
                this.familyInstance.countDocuments(query),
                this.familyInstance.find(query)
                        .skip( Number( from ) )
                        .limit( Number( limit ) )
                        
        ]);
    
        if ( !families.length ) 
            throw new NotFoundException( `Data not found` );
        
        return { total, families };

    };

     //! GET Families by desc Autocomplete //
     public async findAll_autocompleteByDesc ( value: string ) : Promise<any> {

        const data = await this.familyInstance.aggregate([
            { $addFields: { fullString: { $concat: ["$desc"] } } }, 
            { $match: { fullString: { $regex: value } } }
        ]);
    
        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
        
        return data;

    };

    //! GET Family by _id //
    public async findOne ( _id: Types.ObjectId ): Promise<FamilyInterface> {

        const data = await this.familyInstance.findById( _id );
    
        if ( !data ) 
            throw new NotFoundException( `FamilyID ${ _id } not found` );

        if ( !data.active ) 
            throw new NotFoundException( `FamilyID ${ _id } not longer exist` );

        return data;

    };

    //! GET Family by desc //
    public async findOneByDesc ( desc: string ): Promise<FamilyInterface> {

        const data = await this.familyInstance.findOne( { desc } );
        
        if ( !data ) 
            throw new NotFoundException( `desc ${ desc } not found` );
        
        return data;
                
    };

    //! PATCH Family by _id //
    public async updateOne ( { desc, nodeQty }: FamilyDTO, _id: Types.ObjectId ): Promise<FamilyInterface> {

        const data = await this.familyInstance.findByIdAndUpdate( _id, { desc, nodeQty }, updateHeader );

        if ( !data ) 
            throw new NotFoundException( `Data not updated` );

        return data;
        
    };

    //! DELETE Family by _id //
    public async deleteOne ( _id: Types.ObjectId ): Promise<FamilyInterface> {
            
        const data = await this.familyInstance.findByIdAndUpdate( _id, { active: false } );

        if ( !data ) 
            throw new NotFoundException( `Data not deleted` );

        data.active = false;

        return data;

    };

}