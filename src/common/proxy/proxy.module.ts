import { Module } from "@nestjs/common";
import { ClientProxyMain } from "./client.proxy";

@Module({

    providers: [ ClientProxyMain ],
    exports: [ ClientProxyMain ]

})

export class ProxyModule { }