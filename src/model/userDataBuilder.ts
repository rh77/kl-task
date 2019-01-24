import {ObjectMapper} from 'json-object-mapper';
import UserModel from './userModel';

export default function buildUserModels(userData: string): UserModel[] {
    const array = JSON.parse(userData);
    const userModels = 
                array
                    .filter((item: any) => item.id)
                    .map((item: any) => ObjectMapper.deserialize(UserModel, item));
    
    return userModels;
}
