import { Injectable } from '@nestjs/common';

import { hash, compare } from 'bcrypt';

@Injectable()
export class HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
