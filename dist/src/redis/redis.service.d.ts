import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
export declare class RedisService {
    set(key: any | RedisCommandArgument, data: RedisCommandArgument): Promise<any>;
    get(key: RedisCommandArgument): Promise<any>;
    del(key: RedisCommandArgument): Promise<any>;
}
