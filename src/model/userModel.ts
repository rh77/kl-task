import { CacheKey, Deserializer, JsonProperty } from "json-object-mapper";
import groups from "./groups";

@CacheKey("GroupsDeserializer")
class GroupsDeserializer implements Deserializer {
    public deserialize = (value: number): string => {
        return groups[value] || "";
    }
}

// tslint:disable-next-line: max-classes-per-file
export default class UserModel {

    @JsonProperty({ type: String, name: "id" })
    public id!: string;

    @JsonProperty({ type: Number, name: "groupId", deserializer: GroupsDeserializer })
    public group: string;

    @JsonProperty({ type: Number, name: "groupId" })
    public groupId: number;

    @JsonProperty({ type: String, name: "name" })
    public name: string;

    @JsonProperty({ type: String, name: "company" })
    public company: string;

    @JsonProperty({ type: String, name: "email" })
    public email: string;

    @JsonProperty({ type: String, name: "phone" })
    public phone: string;

    constructor() {
        this.id = "";
        this.group = "";
        this.groupId = 0;
        this.name = "";
        this.company = "";
        this.email = "";
        this.phone = "";
    }
}
