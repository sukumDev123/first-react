import React from "react"
import { Route } from "react-router-dom"
import { ShowMonthAndDate } from "./billSreachEle/showMonthAndDate"
import { ShowYearAndMonth } from "./billSreachEle/showYearAndMonth"

import { CateShowList } from "./cateShowList"
export const BillListShow = () => {
  return (
    <div>
      <BodyShowHomePageSreach />
    </div>
  )
}

const BodyShowHomePageSreach = () => (
  <div>
    <Route path="/home/showMD" component={ShowMonthAndDate} />
    <Route path="/home/showYM" component={ShowYearAndMonth} />
    <Route path="/home/testCase" component={CateShowList} />
  </div>
)
