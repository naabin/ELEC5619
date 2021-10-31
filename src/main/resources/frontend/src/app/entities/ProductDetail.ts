import {Complaint} from "./Complaint";
import {User} from "./User";

export class ProductDetail {
    id?: number;
    itemName?: string;
    rateNum?: number;
    reviewNum?: number;
    positionName?: string;
    positionDistance?: number;
    imagePathOne?: string;
    imagePathTwo?: string;
    imagePathThree?: string;
    itemDescription?: string;

    // appliance information
    category?: string;
    brand?: string;
    modelNum?: string;
    serialNum?: string;
    yearPurchased?: string;
    condition?: string;

    // lender
    lender?: User;

    // transaction
    ratePerDay?: number;
    ratePerWeek?: number;
    ratePerMonth?: number;

    // temp items
    fullStarArr?: Array<number>;
    halfStar?: number;
}
