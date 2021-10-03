import { Complaint } from "./Complaint";
import { User } from "./User";

export class Item {
    lender: User;
    itemName: string;
    itemDescription: string;
    available: boolean;
    availableFrom: Date;
    itemPrice: number;
    complaints: Complaint[];
    
}