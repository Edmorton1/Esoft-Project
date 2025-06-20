import { randomCryptoString } from "@s/infrastructure/db/SQL/utils"
import { redis } from "@s/infrastructure/redis/redis"
import { UserSchema } from "@t/gen/Users"
import { z } from "zod"

const RoleIdSchema = UserSchema.pick({id: true, role: true})

type RoleIdType = z.infer<typeof RoleIdSchema>

const prefix = "session-"

class SessionsRedis {
  set = async (data: RoleIdType): Promise<string> => {
    const session = randomCryptoString()
    redis.set(prefix + session, JSON.stringify(data))
    return session
  }

  get = async (key: string): Promise<RoleIdType | undefined> => {
    const raw = await redis.get(prefix + key)
    if (!raw) return;

    const parsed = RoleIdSchema.parse(JSON.parse(raw))
    return parsed
  }
  del =  async (key: string): Promise<void> => {
    await redis.del(prefix + key)
  }
}

export default new SessionsRedis