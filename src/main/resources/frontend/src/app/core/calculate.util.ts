import {Item} from "../entities/Item";

export class CalculateUtil {
    /**
     * Calculate star number
     *
     * @param item
     */
    static calcStarNum(item: Item): Item {
        const totalHalfStar = (item.rating ?? 4.5) / 0.5;
        let fullHalfStar;
        const existHalfStar = totalHalfStar % 2 !== 0;
        if (existHalfStar) {
            fullHalfStar = (totalHalfStar - 1) / 2;
        } else {
            fullHalfStar = totalHalfStar / 2
        }
        const fullStarArr = [];
        for (let i = 0; i < fullHalfStar; i++) {
            fullStarArr.push(1);
        }
        item.fullStarArr = fullStarArr;
        item.existHalfStar = existHalfStar;
        return item;
    }
}
