import {sum} from "../demoTestFiles/sum"; 
import { describe, it, expect } from "vitest";

describe("#sum",() =>{
    it('returns 0 with no numbers',() =>{
        expect(sum()).toBe(0);
    })

    it("sum of 2 should be 6",()=>{
        expect(sum(2)).toBe(2);
    })

    it('sum should 9 from 1,2,-10,-11',() =>{
        expect(sum(1,2,-10,-11)).toBe(-18);
    })
})