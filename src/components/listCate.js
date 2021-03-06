import React, { useState } from "react"
import { CateShowList } from "./cateShowList"
const showCate = type => {
  return <CateShowList typeSeleted={type} />
}
export const ListCate = () => {
  const [btnC, setBtnC] = useState("all")
  const [classNameString, setClassNameString] = useState([
    "btn btn-primary",
    "font_white",
    "font_white",
    "font_white"
  ])
  return (
    <div className="mt-4 mb-4">
      <strong
        style={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={e => {
          setBtnC("all")
          setClassNameString([
            "btn btn-primary",
            "font_white",
            "font_white",
            "font_white"
          ])
        }}
        className={classNameString[0]}
      >
        งบทดลองก่อนปิดบัญชี
      </strong>
      <strong
        style={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={e => {
          setClassNameString([
            "font_white",
            "btn btn-primary",
            "font_white",
            "font_white"
          ])

          setBtnC("1")
        }}
        className={classNameString[1]}
      >
        งบทดลองหลังปิดบัญชี
      </strong>
      <strong
        style={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={e => {
          setClassNameString([
            "font_white",
            "font_white",
            "btn btn-primary",
            "font_white"
          ])

          setBtnC("2")
        }}
        className={classNameString[2]}
      >
        งบกำไรขาดทุน
      </strong>
      <strong
        style={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={e => {
          setClassNameString([
            "font_white",
            "font_white",
            "font_white",
            "btn btn-primary"
          ])

          setBtnC("1")
        }}
        className={classNameString[3]}
      >
        งบแสดงฐานะการเงิน
      </strong>
      {showCate(btnC)}
    </div>
  )
}
