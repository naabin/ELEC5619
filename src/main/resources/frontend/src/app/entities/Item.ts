import {Complaint} from "./Complaint";
import {User} from "./User";
import {ItemInformation} from "./ItemInformation";

export class Item {
    id?: string;
    lender?: User;
    itemName: string;
    category: string;
    itemDescription: string;
    itemInformation: ItemInformation;
    available: boolean;
    availableFrom: Date;
    itemPrice: number;
    complaints?: Complaint[];

    // default rating number
    rating? = 4.5;
    // calculated star
    fullStarArr?: number[];
    existHalfStar?: boolean;
}
