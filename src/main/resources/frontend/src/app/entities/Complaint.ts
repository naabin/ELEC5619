import { User } from "./User";
import { Item } from "./Item";
export class Complaint {
    id: string;
    complainedItem: Item;
    renter: User;
    lender: User;
}
