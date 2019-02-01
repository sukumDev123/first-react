import React, { useState } from "react"
import { CateShowList } from "./cateShowList"
import { BillListShow } from "./billShow"

export const HomePage = ({ serverStatus }) => {
  const [showBill, setShowBill] = useState(true)
  const [showCa, setShowCa] = useState(true)
  return (
    <div>
      <h1 className="font_white mt-4 mb-4">HomePage</h1>
      <button
        onClick={e => {
          if (showBill === false) setShowBill(true)
          else setShowBill(false)
        }}
        className="btn btn-secondary"
      >
        แสดงรายละเอียดบิล
      </button>
      <button
        onClick={e => {
          if (showCa === false) setShowCa(true)
          else setShowCa(false)
        }}
        className="btn btn-secondary ml-2"
      >
        แสดงรายละเอียดบัชญี
      </button>

      <div>{showBill ? <BillListShow /> : ""}</div>
      <div>{showCa ? <CateShowList /> : ""}</div>
    </div>
  )
}
