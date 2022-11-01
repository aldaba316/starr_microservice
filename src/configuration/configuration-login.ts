/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";

export default registerAs('login', () => ( {

    secretKey: process.env.SECRET_KEY

} ) );