import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import {RedisModule, RedisService} from "nestjs-redis";

@Module({
  imports: [
      RedisModule.register({
        url: 'redis://localhost:10000/1'
      })
  ],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(
        private readonly redisService: RedisService
    ) {
    }

    public onApplicationBootstrap(): void {
        let i = 0
        setInterval(() => {
            i++
            const client = this.redisService.getClient()
            client.rpush("queue:mail.send", JSON.stringify({
                email: 'dinkodanil@gmail.com',
                message: `Hello world #${i}`
            }))
        }, 1000)
    }
}
