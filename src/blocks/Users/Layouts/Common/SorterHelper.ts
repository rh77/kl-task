import UserModel from '../../../../model/userModel';

export interface ISortUsersInfo {
    users: UserModel[];
    sortedFields: string[];
    isDescending: boolean;
}

export default class SorterHelper {

    public static sortUsers(sortInfo: ISortUsersInfo): ISortUsersInfo {

        const { sortedFields, isDescending, users } = sortInfo;
        let comparer: (a: UserModel, b: UserModel) => number;

        if (sortedFields.length === 1) {
            const field = sortedFields[0];
            if (isDescending) { 
                comparer = (a, b) => {
                    return a[field] > b[field] ? -1 : 1;
                };
            } else {
                comparer = (a, b) => {
                    return a[field] > b[field] ? 1 : -1;
                };
            }
        } else {

            const greater = isDescending ? -1 : 1;
            const lower = isDescending ? 1 : -1;
            comparer = (a, b) => {
                for (const field of sortedFields) {
                    const aField = a[field];
                    const bField = b[field];
                    if (aField === bField) {
                        continue;
                    }

                    return aField > bField ? greater : lower;
                }

                return 0;
            };
        }
       
        users.sort(comparer);
        
        return sortInfo;
    }
}
