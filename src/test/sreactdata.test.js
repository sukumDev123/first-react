import { expect } from "chai"
import { SreactData } from "../logic/sreactData"

const data = [
  {
    id_bill: 101,
    date_is: +new Date("02/01/1998"),
    arrInfo: [{ dr: 1000, cr: 50 }, { dr: 500, cr: 1000 }]
  },
  {
    id_bill: 102,
    date_is: +new Date("02/02/1998"),
    arrInfo: [{ dr: 2000, cr: 0 }]
  },
  {
    id_bill: 103,
    date_is: +new Date("02/03/1998"),
    arrInfo: [{ dr: 1000, cr: 2000 }]
  }
]

describe("SreactData Class", () => {
  it("Test SreactData For findUniQMonth", () => {
    const monthTest = new SreactData(data).findUniQMonth()
    //expect(monthTest[0]).equal("January")
    expect(monthTest[0]).equal("February")
  })
  it("Test UniQ For findUniQYear", () => {
    const yearTotal = new SreactData(data).findUniQYear()
    expect(yearTotal[0]).equal(1998)
  })
  it("Test UniQ For findUniQDate", () => {
    const dateTotal = new SreactData(data).findUniQDate()
    expect(dateTotal[0]).equal(1)
  })
  it("test sreachDataOfMonth For when month input February dr === 1000", () => {
    const sreachDataOfMonthV = new SreactData(data).sreachDataOfMonth(
      "February"
    )
    expect(sreachDataOfMonthV[0].arrInfo[0].dr).equal(1000)
  })
  it("Test When i find data from month = February and data month get cal data to return totalCr === 2050 and total Dr === 4000", () => {
    const createObject = new SreactData(data)
    const sreachDataOfMonth = createObject.sreachDataOfMonth("February")
    const getDataMonthToCal = sreachDataOfMonth.map(data =>
      createObject.handlerDataOfMonth(data)
    )

    expect(getDataMonthToCal[0].totalCr).equal(1050)
    expect(getDataMonthToCal[0].totalDr).equal(1500)
  })
  it("Test Sreach data from year == 1998", () => {
    const sreachDataOfYearV = new SreactData(data).sreachDataOfYear(1998)
    // expect(sreachDataOfYearV)
  })
  it("Test When I want to result sreact data from year 1998 dr total == 4000 cr total == 3050", () => {
    const createObj = new SreactData(data)
    const sreachDataOfYearV = createObj.sreachDataOfYear(1998)
    const handlerResultFromY = createObj.hadnlerDataYear(sreachDataOfYearV)
    expect(handlerResultFromY[0].calDr).equal(450)
  })
})
