const singletonEnforcer = Symbol();
const singleton = Symbol();

export default class UserDataProvider {
    private data?: any[];

    constructor(enforcer: symbol) {
        
        if (enforcer !== singletonEnforcer) {
            throw new Error("Data provider manual construction is not allowed");
        }
    }

    public get userData() {
        return this.data || [];
    }
    
// tslint:disable-next-line: no-empty
    public onDataReady(): void {}

    public requestUsersData(url: string): void {

        this.downloadUsers(url)
                .then((value: any[]) => {
                    this.data = value;
                    this.onDataReady();
                })
                .catch((error: Error) => {
                    alert(error.message);
                    this.data = undefined;
                });
    }

    public static get instance(): UserDataProvider {

        if (!this[singleton]) {
            this[singleton] = new UserDataProvider(singletonEnforcer);
        }

        return this[singleton];
    }

// tslint:disable-next-line: no-empty
    public static set instance(value: UserDataProvider) {}

    private async downloadUsers(url: string): Promise<any[]> {
        return new Promise((resolve, reject) => {

            const request = new XMLHttpRequest();
            request.open('GET', url);
        
            request.onload = function() {

                if (this.status === 200) {

                    const array = JSON.parse(this.response);
                    resolve(array);

                } else {
                    
                    const error = new Error(this.statusText);
                    error.message += " :" + this.status;
                    reject(error);
                }
            };
        
            request.onerror = () => {
              reject(new Error("Failed to download users"));
            };
        
            request.send();
          });
    }
}
