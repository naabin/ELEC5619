import { Complaint } from "./Complaint";
import { User } from "./User";

export class Item {
    id: string;
    lender: User;
    itemName: string;
    category: string;
    itemInformation: ItemInformation;
    itemDescription: string;
    available: boolean;
    availableFrom: Date;
    itemPrice: number;
    complaints: Complaint[];

}

export class ItemInformation {
  id: number;
  brand: string;
  modelNumber: string;
  serialNumber: string;
  itemCondition: string;
  rentalPricePerDay: string;
  rentalPricePerWeek: string;
  rentalPricePerMonth: string;
  yearPurchase: number;
}
