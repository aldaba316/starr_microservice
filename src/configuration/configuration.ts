/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";

export default registerAs('mongo', () => ( {

    host: process.env.HOST_MONGODB || 'localhost',
    port: parseInt( process.env.PORT_MONGODB, 10 ) || 27017,
    user: process.env.USER_MONGODB,
    password: process.env.PASSWORD_MONGODB,
    database: process.env.DATABASE_MONGODB,
    runnin_port: process.env.RUNNIN_PORT,
    microservice_port: process.env.MICROSERVICE_PORT,

    //! User MicroService env // 
    userMicroservice: process.env.USER_MICROSERVICE

} ) );