import React, { useEffect, useState } from "react"
import { billAll } from "../../services/categoryS"

import { SreactData } from "../../logic/sreactData"
import NumberFormat from "react-number-format"
import { Loadding } from "../../App"
const dateHandler = dateIs => {
  const dateN = new Date(dateIs)
  const dateForMat = `${dateN.getDate()}-${new SreactData().filterMonth(
    dateN.getMonth()
  )}-${dateN.getFullYear()}`
  return dateForMat
}
export const ShowYearAndMonth = () => {
  const [tempArr, setTempArr] = useState([])
  const [formYearArr, setYearArr] = useState([])
  const [formYearSelete, setYearSelete] = useState("")
  const [formMonthArr, setFormMonthArr] = useState([])
  const [formMonthSelete, setFormMonthSelect] = useState("")
  const [arrayShowTable, setArrayShowTable] = useState([])

  useEffect(() => {
    billAll()
      .then(d => {
        const { data } = d.data
        const hadnlerA = data.map(res => {
          return {
            ...res,
            date_is: parseFloat(res.date_is)
          }
        })
        document.getElementById("loadding_bk").style.display = "none"

        const yearArr = new SreactData(hadnlerA).findUniQYear()
        setTempArr(hadnlerA)
        setYearArr(yearArr)
      })
      .catch(e => {
        window.location.href = "/#/error"
      })
  }, [])
  useEffect(
    () => {
      const handlerData = tempArr.filter(
        d => new Date(d.date_is).getFullYear() === parseFloat(formYearSelete)
      )
      const monthA = handlerData
        .map(d => new Date(d.date_is).getMonth())
        .sort()
        .filter((item, index, data) => data.indexOf(item) === index)
        .map(d => new SreactData().filterMonth(d))
      setFormMonthArr(monthA)
      setTempArr(handlerData)
    },
    [formYearSelete]
  )
  useEffect(
    () => {
      const handlerDataFromMonth = tempArr.filter(
        d =>
          new SreactData().filterMonth(new Date(d.date_is).getMonth()) ===
          formMonthSelete
      )
      const id_type = handlerDataFromMonth
        .map(d => d.id)
        .filter((item, index, arr) => arr.indexOf(item) === index)
      const arrTotal = id_type.map(id => {
        const arr = handlerDataFromMonth.filter(data => data.id === id)
        const totalCr = arr.reduce((sum, data) => sum + parseFloat(data.cr), 0)
        const totalDr = arr.reduce((sum, data) => sum + parseFloat(data.dr), 0)
        return {
          arrInfor: arr,
          id_type: id,
          totalCr,
          totalDr,
          name_type: arr[0].name_type
        }
      })
      console.log({ arrTotal })
      setArrayShowTable(arrTotal)
    },
    [formMonthSelete]
  )
  return (
    <div>
      <div className="bkShow_Fixed">
        <Loadding />

        <h5 className="font_white"> ค้นหารายการจากหมวดหมู่ </h5>
        <div className="md-form p-3">
          <label className="font_white"> เลือกปีที่ต้องการแสดง </label>
          <select
            className="form-control"
            value={formYearSelete}
            onChange={e => setYearSelete(e.target.value)}
          >
            <option>เลือกปีที่ต้องการแสดง</option>
            {formYearArr.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        {formMonthArr.length ? (
          <div className="md-form p-3">
            <label className="font_white"> ค้นหาจากเดือน </label>
            <select
              className="form-control"
              value={formMonthSelete}
              onChange={e => setFormMonthSelect(e.target.value)}
            >
              <option>เลือกเดือน ต้องหารค้น</option>
              {formMonthArr.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
        {/* <div> */}
        {arrayShowTable.length ? (
          <div style={{ overflow: "auto", height: "300px" }}>
            {arrayShowTable.map((d, i) => {
              const { arrInfor } = d
              return (
                <div key={i} className="p-3 mt-3 mb-3">
                  <h4 className="font_white"> รหัสประเภท : {d.id_type} </h4>
                  <h4 className="font_white"> ชื่อประเภท : {d.name_type} </h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th> วันที่ </th>
                        <th> เดบิต </th>
                        <th> เครดิต </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrInfor.map((res, i) => (
                        <tr key={i}>
                          <td className="font_white">
                            {" "}
                            {dateHandler(res.date_is)}{" "}
                          </td>
                          <td className="font_white">
                            {" "}
                            <NumberFormat
                              value={res.dr}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"฿"}
                              decimalScale={2}
                            />{" "}
                          </td>
                          <td className="font_white">
                            {" "}
                            <NumberFormat
                              value={res.cr}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={2}
                              prefix={"฿"}
                            />{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4 className="font_white">
                    {"เดบิตทั้งหมด : "}
                    <NumberFormat
                      value={d.totalDr}
                      decimalScale={2}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                    {" บาท"}
                  </h4>
                  <h4 className="font_white">
                    เครดิตทั้งหมด :
                    <NumberFormat
                      value={d.totalCr}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      prefix={"฿"}
                    />
                    {" บาท"}
                  </h4>
                </div>
              )
            })}
          </div>
        ) : (
          <p> "Data emp"</p>
        )}
        {/* </div> */}
      </div>
    </div>
  )
}
