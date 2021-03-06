import { Injectable } from '@nestjs/common';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import { createClient } from 'redis';

const client = createClient();
@Injectable()
export class RedisService {
    async set(key: any | RedisCommandArgument, data: RedisCommandArgument): Promise<any> {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect()
        }

        await client.set(key, data);
        return true;
    }

    async get(key: RedisCommandArgument): Promise<any> {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect()
        }

        const value = await client.get(key);
        return value;
    }

    async del(key: RedisCommandArgument): Promise<any> {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect()
        }

        const value = await client.del(key);
        return value;
    }

    async delWithPrefix(key: RedisCommandArgument): Promise<any> {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect()
        }

        const keys = await client.keys(key);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            await client.del(key)
        }

        return true;
    }
}
