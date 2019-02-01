import React from "react"
import { Link } from "react-router-dom"
export const BillListShow = () => {
  return (
    <div>
      <NavOfHomePage />
      <BodyShowHomePageSreach />
    </div>
  )
}

const NavOfHomePage = () => (
  <Link className="nav-link font_black ml-4" to="/home/showMD">
    แสดงรายวันและรายเดือน
  </Link>
)

export const BodyShowHomePageSreach = () => {}
