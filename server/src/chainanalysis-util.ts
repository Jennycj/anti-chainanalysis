import axios from "axios";
import {UTXO} from "./chainanalysis-service";


export class ChainAnalysisUtil {


    partition(array: Array<UTXO>, left: number = 0, right: number = array.length - 1) {
        const pivot = array[Math.floor((right + left) / 2)].amountInSats;
        let i = left;
        let j = right;

        while (i <= j) {
            while (array[i].amountInSats < pivot) {
                i++;
            }

            while (array[j].amountInSats > pivot) {
                j--;
            }

            if (i <= j) {
                [array[i], array[j]] = [array[j], array[i]];
                i++;
                j--;
            }
        }

        return i;
    }

    quickSort(array: Array<UTXO>, left: number = 0, right: number = array.length - 1) {
        let index;

        if (array.length > 1) {
            index = this.partition(array, left, right);

            if (left < index - 1) {
                this.quickSort(array, left, index - 1);
            }

            if (index < right) {
                this.quickSort(array, index, right);
            }
        }

        return array;
    }

    binarySearch(nums: UTXO[], target: number): UTXO | number{
        let left: number = 0;
        let right: number = nums.length - 1;

        while (left <= right) {
            const mid: number = Math.floor((left + right) / 2);

            if (nums[mid].amountInSats === target) return nums[mid];
            if (target < nums[mid].amountInSats) right = mid - 1;
            else left = mid + 1;
        }
        return 0;
    }

}


let chainAnalysisUtil = new ChainAnalysisUtil();
export default chainAnalysisUtil;
