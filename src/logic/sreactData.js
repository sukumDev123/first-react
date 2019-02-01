export class SreactData {
  constructor(data) {
    this.data = data
  }
  totalMonth() {
    return `January 
    February
    March
    April 
    May 
    June 
    July 
    August 
    September 
    October 
    November 
    December `
      .split("\n")
      .map((d, i) => d.split(" ").filter(d => d)[0])
  }
  filterMonth(indexMonth) {
    return this.totalMonth()[indexMonth]
  }
  messageToUser() {
    return "You must input data from contructor."
  }
  /** ----------------- */
  findUniQMonth(data) {
    if (data) {
      return data
        .map(result => new Date(result.date_is).getMonth())
        .filter((item, index, list) => list.indexOf(item) === index)
        .sort()
        .map(d => this.filterMonth(d))
    }
    return this.messageToUser()
  }
  findUniQYear() {
    if (this.data) {
      return this.data
        .map(result => new Date(result.date_is).getFullYear())
        .filter((item, index, list) => list.indexOf(item) === index)
    }
    return this.messageToUser()
  }
  findUniQDate() {
    if (this.data) {
      return this.data
        .map(result => new Date(result.date_is).getDate())
        .filter((item, index, list) => list.indexOf(item) === index)
    }
    return this.messageToUser()
  }

  /** sreach */
  sreachDataOfMonth(month) {
    if (this.data) {
      const dataForThisMonth = this.data.filter(res => {
        const dataMonth = this.filterMonth(new Date(res.date_is).getMonth())
        return dataMonth === month
      })
      return dataForThisMonth
    }
    return this.messageToUser()
  }
  sreachDataOfYear(year) {
    if (this.data) {
      const dataForThisYear = this.data.filter(res => {
        const dataYear = new Date(res.date_is).getFullYear()
        return year === dataYear
      })
      const andTotalDrAndCr = dataForThisYear.map(result => {
        const totalCr = this.sumCrTotal(result.arrInfo)
        const totalDr = this.sumDrTotal(result.arrInfo)
        return {
          id_bill: result.id_bill,
          date_is: result.date_is,
          totalCr,
          totalDr
        }
      })
      // console.log({ andTotalDrAndCr })
      return andTotalDrAndCr
    }
  }
  /** use in method */
  sumDrTotal(data) {
    return data.reduce((sum, data) => sum + parseInt(data.dr), 0)
  }
  sumCrTotal(data) {
    return data.reduce((sum, data) => sum + parseInt(data.cr), 0)
  }

  /** handler arr from user data. */
  handlerDataOfMonth(dataFromMonth) {
    if (dataFromMonth) {
      const handlerDataMonthDrTotal = this.sumDrTotal(dataFromMonth.arrInfo)
      const handlerDataMonthCrTotal = this.sumCrTotal(dataFromMonth.arrInfo)
      const tempNewArr = {
        dataArr: dataFromMonth,
        totalCr: handlerDataMonthCrTotal,
        totalDr: handlerDataMonthDrTotal
      }
      // console.log({ tempNewArr })
      return tempNewArr
    }
    return "dataFromMonth is null"
  }
  hadnlerDataYear(dataFromYearArr) {
    if (dataFromYearArr) {
      const plusDataTotal = dataFromYearArr.map(dataFromYear => {
        const calCr =
          dataFromYear.totalCr - dataFromYear.totalDr < 0
            ? 0
            : dataFromYear.totalCr - dataFromYear.totalDr
        const calDr =
          dataFromYear.totalDr - dataFromYear.totalCr < 0
            ? 0
            : dataFromYear.totalDr - dataFromYear.totalCr
        dataFromYear.calCr = calCr
        dataFromYear.calDr = calDr
        return dataFromYear
      })
      // console.log(plusDataTotal[0])
      return plusDataTotal
    }
  }
  setData(data) {
    this.data = data
    return this
  }
}
