import { Item } from "./Item";
import { User } from "./User";

export class RentedItem {
    id: string;
    lender: User;
    renter: User;
    rentedItem: Item;
    rentedAt: Date;
    rentedUntil: Date;
    overdue: boolean;
    comission: number;
    agreedPrice: number;
}