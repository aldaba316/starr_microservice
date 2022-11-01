import { Injectable, Inject, NotFoundException, ConflictException } from "@nestjs/common";

import { Model, Types } from 'mongoose';

import { RepairSolutionInterface } from "../interface";

import { CloseRepairReplaceDTO, CloseRepairDTO } from "../dto";

import { updateHeader } from "../../shared/global/updateHeader";

@Injectable( )
export class RepairSolutionService {

    constructor(

        @Inject( 'RepairSolution' ) 
        private readonly repairSolutionInterface: Model<RepairSolutionInterface>,

     ) { }

     public async create( closeRepairDTO: CloseRepairDTO ): Promise<RepairSolutionInterface> {

        const data = new this.repairSolutionInterface( closeRepairDTO );

        return await data.save( );

     };

     public async createReplace( closeRepairReplaceDTO: CloseRepairReplaceDTO ): Promise<RepairSolutionInterface> {

        const data = new this.repairSolutionInterface( closeRepairReplaceDTO );

        return await data.save( );

     };

     public async findOne( _id: Types.ObjectId ): Promise<RepairSolutionInterface> {

        const data = await this.repairSolutionInterface.findById( _id );

        if ( !data )
            throw new NotFoundException( `RepairSolution _id ${ _id } not found` )

        return data;

     };

     public async findAll( from = 0, limit = 5 ): Promise<any> {

        const query = { active: true };

        const [ total, repairSoluctions ] = await Promise.all([
    
                this.repairSolutionInterface.countDocuments(query),
                this.repairSolutionInterface.find(query)
                        .skip( Number( from ) )
                        .limit( Number( limit ) )
                        
        ]);
    
        if ( !repairSoluctions.length ) 
            throw new NotFoundException( `Data not found` );
        
        return { total, repairSoluctions };

     };

     public async patchRepairSoluction_repair( 
         repairSolutionID: Types.ObjectId, 
         _repair: Types.ObjectId 
      ): Promise<RepairSolutionInterface> {

         const updated = await this.repairSolutionInterface.findByIdAndUpdate( 
            repairSolutionID, { $set: { _repair }, updateHeader }
         );

         if ( !updated ) 
            throw new ConflictException( `Data not updated patchRepairSoluction_repair` );

         return updated;

     };

}