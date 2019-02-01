import React from "react"
import { Link, Route } from "react-router-dom"
import { ShowMonthAndDate } from "./billSreachEle/showMonthAndDate"
import { ShowYearAndMonth } from "./billSreachEle/showYearAndMonth"
export const BillListShow = () => {
  return (
    <div>
      Hi
      <NavOfHomePage />
      <BodyShowHomePageSreach />
    </div>
  )
}

const NavOfHomePage = () => (
  <div>
    <button className="btn btn-primary">
      <Link className="nav-link font_white ml-4 " to="/home/showMD">
        แสดงรายละเอียดแบบละเอียดต่อเดือน
      </Link>{" "}
    </button>
    <br />
    <br />

    <button className="btn btn-primary">
      <Link className="nav-link font_white  " to="/home/showYM">
        แสดงรายละเอียดต่อปี
      </Link>
    </button>
  </div>
)

const BodyShowHomePageSreach = () => (
  <div>
    <Route path="/home/showMD" component={ShowMonthAndDate} />
    <Route path="/home/showYM" component={ShowYearAndMonth} />
  </div>
)
