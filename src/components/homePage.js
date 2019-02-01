import React, { useState } from "react"
import { Link } from "react-router-dom"
import { BillListShow } from "./billShow"

export const HomePage = () => {
  return (
    <div>
      <h1 className="font_white mt-4 mb-4">HomePage</h1>
      <button className="btn btn-secondary">
        <Link className="nav-link font_white " to="/home/showMD">
          ค้นหาข้อมูลจากบิล
        </Link>
      </button>
      <button className="btn btn-secondary ml-2">
        <Link className="nav-link font_white " to="/home/showYM">
          บัญชีแยกประเภท
        </Link>
      </button>
      <button className="btn btn-secondary ml-2">
        {" "}
        <Link className="nav-link font_white " to="/home/testCase">
          งบทดลองทั้งหมด
        </Link>
      </button>
      <BillListShow />

      {/* <div>{showBill ?  : ""}</div>
      <div>{showCa ? <CateShowList /> : ""}</div> */}
    </div>
  )
}
