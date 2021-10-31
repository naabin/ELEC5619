import {Complaint} from "./Complaint";
import {User} from "./User";
import {ItemInformation} from "./ItemInformation";

export class Item {
    id?: number;
    lender?: User;
    itemName: string;
    category: string;
    itemDescription: string;
    itemInformation: ItemInformation;
    available: boolean;
    availableFrom: Date;
    itemPrice: number;
    complaints?: Complaint[];
    images?: Image[]

    // default rating number
    rating? = 4.5;
    // calculated star
    fullStarArr?: number[];
    existHalfStar?: boolean;
}

export class Image {
    id: number;
    name: string;
    type: string;
    imageUrl: string;
}
