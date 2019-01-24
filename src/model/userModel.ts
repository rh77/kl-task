import { JsonProperty } from "json-object-mapper";

export default class UserModel {

    @JsonProperty({ type: String, name: "id" })
    public id!: string;

    @JsonProperty({ type: Number, name: "groupId" })
    public groupId?: number;

    constructor() {
        this.id = "";
        this.groupId = void 0;
    }
}
