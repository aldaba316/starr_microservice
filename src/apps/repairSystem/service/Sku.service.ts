import { Injectable, Inject, ConflictException, NotFoundException } from "@nestjs/common";

//* DTO //
import { SkuDTO } from "../dto";

//* Interface //
import { SkuInterface, SkuPagination } from "../interface";

//* Mongoose // 
import { Model, Types } from 'mongoose';

//* Global //
import { updateHeader } from "../../shared/global/updateHeader";

@Injectable( ) 

export class SkuService {
 
    constructor(

        @Inject( 'Sku' ) 
        private readonly skuInterface: Model<SkuInterface>,

     ) { }

     //! POST SKU //
    public async create( skuDTO: SkuDTO ): Promise<SkuInterface> {

        // const exist_sku = await this.skuInterface.findOne( { sku: skuDTO.sku } );

        // if ( exist_sku ) 
        //     throw new ConflictException( `sku ${ skuDTO.sku } already exist` );

        const new_skuInterface = new this.skuInterface( skuDTO );

        return await new_skuInterface.save( );

    };

     //! GET SKU by sku Autocomplete //
     public async findAll_autocompleteBySKU ( value: string ) : Promise<any> {

        const data = await this.skuInterface.aggregate([
            { $addFields: { fullString: { $concat: ["$sku"] } }},
            { $match: { fullString: { $regex: value } } }
        ]);

        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
    
        return data;

    };

     //! GET SKUs //
     public async findAll( from = 0, limit = 5 ): Promise<SkuPagination> {

        const query = { active: true };

        const [ total, skus ] = await Promise.all([

            this.skuInterface.countDocuments(query),
            this.skuInterface.find(query)
                .skip( Number( from ) )
                .limit( Number( limit ) )
                    
        ]);

        if ( !skus.length ) 
            throw new NotFoundException( `Data not found` );
    
        return { total, skus };

    };

    //! GET sku by id //
    public async findOne( _id: Types.ObjectId ): Promise<SkuInterface> {

        const data = await this.skuInterface.findById( _id );

        if ( !data ) 
            throw new NotFoundException( `SKU _id ${ _id } not found` );

        if ( !data.active ) 
            throw new NotFoundException( `SKU _id ${ _id } not longer exist` );

        return data;

    };

     //! GET sku Decorator //
     public async findOneBySku( sku: string ): Promise<string> {

        const data = await this.skuInterface.findOne( { sku } );

        if ( data ) 
            throw new NotFoundException( `SKU  ${ sku } already exist` );

        return 'Go ahead';

    };

    //! PATCH sku //
    public async updateOne( _id: Types.ObjectId, { sku }: SkuDTO  ): Promise<SkuInterface> {

        const data = await this.skuInterface.findByIdAndUpdate( _id, { sku }, updateHeader );

        if ( !data ) 
            throw new ConflictException( `sku not updated` );

        return data;

    };

    //! DELETE sku //
    public async deleteOne( _id: Types.ObjectId  ): Promise<SkuInterface> {

        const data = await this.skuInterface.findByIdAndUpdate( _id, { active: false } );

        if ( !data ) 
            throw new ConflictException( `sku not deleted` );

        data.active = false;

        return data;

    };

}