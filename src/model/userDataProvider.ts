import buildUserModels from './userDataBuilder';
import UserModel from './userModel';

const singletonEnforcer = Symbol();
const singleton = Symbol();

export default class UserDataProvider {
    private data?: UserModel[];

    constructor(enforcer: symbol) {
        
        if (enforcer !== singletonEnforcer) {
            throw new Error("Data provider manual construction is not allowed");
        }
    }

    public static get instance(): UserDataProvider {

        if (!this[singleton]) {
            this[singleton] = new UserDataProvider(singletonEnforcer);
        }

        return this[singleton];
    }

// tslint:disable-next-line: no-empty
    public static set instance(value: UserDataProvider) {}

    public get userData() {
        return this.data || [];
    }
    
// tslint:disable-next-line: no-empty
    public onDataReady(): void {}

    public requestUsersData(url: string): void {

        this.data = void 0;
        
        UserDataProvider.downloadString(url)
                .then((result: string) => {
                    this.data = buildUserModels(result);
                    this.onDataReady();
                })
                .catch((error: Error) => {
                    alert(error.message);
                    this.data = void 0;
                });
    }

// tslint:disable-next-line: member-ordering
    private static async downloadString(url: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const request = new XMLHttpRequest();
            request.open('GET', url);
        
            request.onload = function() {

                if (this.status === 200) {

                    resolve(this.response);

                } else {
                   
                    const error = new Error(`Status: ${this.statusText}. Code: ${this.status}`);
                    reject(error);
                }
            };
        
            request.onerror = () => {
                reject(new Error("Failed to download string. Ready state was: " + request.readyState));
            };
        
            request.send();
        });
    }
}
