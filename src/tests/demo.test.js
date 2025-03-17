import { describe, it, expect } from "vitest";
import {  demo ,checkSpecific } from "../components/Demo";

const t = true;
describe("#demo", () => {
  it("0 parameter will give 0", () => {
    expect(demo(0)).toBe(0);
  });

  it.skip("skippin test", () => {
    expect(demo(2, 34).toBe(36));
  });

  it.skipIf(t)("skip only t is true", () => {
    expect(demo(40, 2)).toBe(42);
  });

  it.runIf(t)("run only when  t is true", () => {
    expect(demo(12, 12)).toBe(24);
  });
});


describe("#checkSpecific",()=>{
    // it.only("add sum to 40 ",() =>{

    //     expect(checkSpecific(12,1,4,23)).toBe(40)
    // })

    it('add sum to 20',()=>{
        expect(checkSpecific(10,10)).toBe(20)
    })


})
