import { IPasswordHasher } from './password-hasher.interface.js';
export declare class BcryptPasswordHasherService implements IPasswordHasher {
    private readonly rounds;
    hash(plain: string): Promise<string>;
    compare(plain: string, hashed: string): Promise<boolean>;
}
