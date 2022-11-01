import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {

    constructor( private scheduleRegistry:SchedulerRegistry ) { }

//     @Cron( '*/10 * * * * *', {

//         // const job: CronJob = this.scheduleRegistry.getCronJob( 'cron 1' )
//         // job.stop( );
//         // job.start( );
//         // for ( const job of this.scheduleRegistry.getCronJobs.keys( ) )
        
//         name: 'cron 1'

//     })
//    public cron1 ( ): void {

//         console.log( 'cron1' );

//     };

//     @Cron( '*/30 * * * * *', {

//         name: 'cron 2'

//     })
//     public cron2 ( ): void {

//         console.log( 'cron2' );

//     };

//     @Cron( '* * * * *', {

//         name: 'cron 3'

//     })
//     public cron3 ( ): void {

//         console.log( 'cron3' );
        
//     };

}
