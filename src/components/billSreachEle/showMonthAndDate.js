import React, { useEffect, useState } from "react"
import { billAll } from "../../services/categoryS"
import { SreactData } from "../../logic/sreactData"
import NumberFormat from "react-number-format"
import { Link } from "react-router-dom"
import { Loadding } from "../../App"
export const ShowMonthAndDate = () => {
  const [dataBill, setDataBill] = useState([])
  const [monthUni, setMonthUni] = useState([])
  const [monthUniSelected, setMUS] = useState("0")
  const [yearUniSeleted, setYUS] = useState("0")
  const [yearArr, setYearArr] = useState([])
  const [showBillTable, setBillTable] = useState([])
  const sreactData = new SreactData()
  const [tempArr, setTempArr] = useState([])
  useEffect(() => {
    billAll()
      .then(res => {
        const { data } = res.data
        const handlerData = data.map(d => {
          return {
            ...d,
            date_is: parseInt(d.date_is)
          }
        })
        document.getElementById("loadding_bk").style.display = "none"
        const setYearUniArr = sreactData.setData(handlerData).findUniQYear()
        setYearArr(setYearUniArr) // arr year uniqlo
        setTempArr(handlerData) // all data
      })
      .catch(e => console.log({ e }))
  }, [])
  useEffect(
    () => {
      const zipBill_id = tempArr
        .map(d => d.id_bill)
        .filter((item, index, list) => list.indexOf(item) === index)
      const zipBill = zipBill_id.map(id_b => {
        const filterBillFromId = tempArr.filter(d => id_b == d.id_bill)
        return {
          id_bill: id_b,
          date_is: filterBillFromId[0].date_is,
          arrInfo: filterBillFromId,
          detail: filterBillFromId[0].detail,
          id_doc: filterBillFromId[0].id_doc
        }
      })
      const monthUniV = zipBill.filter(item => {
        const callB = new Date(item.date_is).getFullYear()
        return parseInt(yearUniSeleted) === callB
      })
      const monthUniVText = sreactData.findUniQMonth(monthUniV)
      setMonthUni(monthUniVText)
      setDataBill(monthUniV)
    },
    [yearUniSeleted]
  )

  useEffect(
    () => {
      const sreachDataFromMonth = sreactData
        .setData(dataBill)
        .sreachDataOfMonth(monthUniSelected)
      const handlerDataMonth = sreachDataFromMonth.map(dataFromM =>
        sreactData.handlerDataOfMonth(dataFromM)
      )
      setBillTable(handlerDataMonth)
    },
    [monthUniSelected]
  )
  return (
    <div className="bkShow_Fixed">
      <Loadding />

      <div>
        <h5 className="font_white">ค้าหารายการบิล</h5>
        <div className="p-3">
          <label className="font_white">เลือกปีที่ต้องการแสดง</label>
          <select
            value={yearUniSeleted}
            className="form-control"
            onChange={e => setYUS(e.target.value)}
          >
            <option value="0"> เลือกปีที่ต้องการแสดง</option>

            {yearArr.map((d, i) => (
              <option key={i}> {d} </option>
            ))}
          </select>
        </div>

        {monthUni.length ? (
          <div className="md-form p-3">
            <label className="font_white"> Sreach Data From Month </label>
            <select
              value={monthUniSelected}
              onChange={e => setMUS(e.target.value)}
              className="form-control"
            >
              <option value="0"> Selected your data from month. </option>
              {monthUni.map((d, i) => (
                <option key={i}>{d}</option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {showBillTable.length
          ? showBillTable.map(d => {
              const { dataArr, totalCr, totalDr } = d
              const { arrInfo } = dataArr

              return (
                <TableBillSreach
                  dataArr={dataArr}
                  totalCr={totalCr}
                  totalDr={totalDr}
                  dataInfo={arrInfo}
                />
              )
            })
          : ""}
      </div>
    </div>
  )
}
const dateHandler = dateIs => {
  const dateN = new Date(dateIs)
  const dateForMat = `${dateN.getDate()}-${new SreactData().filterMonth(
    dateN.getMonth()
  )}-${dateN.getFullYear()}`
  return dateForMat
}
const TableBillSreach = ({ dataArr, totalCr, totalDr, dataInfo }) => (
  <div className="p-3" style={{ overflow: "auto", height: "300px" }}>
    <h4 className="font_white">รหัสบิล : {dataArr.id_bill}</h4>
    <h4 className="font_white">วันที่ : {dateHandler(dataArr.date_is)}</h4>

    <table className="table">
      <thead>
        <tr>
          <th> ชนิด </th>

          <th> เดบิต </th>
          <th> เครดิต </th>
        </tr>
      </thead>
      <tbody>
        {dataInfo.map((drCr, i) => (
          <tr key={i}>
            <td className="font_white"> {drCr.name_type} </td>

            <td className="font_white">
              <NumberFormat
                value={drCr.dr}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </td>
            <td className="font_white">
              <NumberFormat
                value={drCr.cr}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <h5 className="font_white">
      เดบิตทั้งหมด :
      <NumberFormat
        style={{ marginLeft: "20px", marginRight: "20px" }}
        value={totalDr}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"฿"}
      />
      บาท
    </h5>
    <h5 className="font_white">
      เครดิตทั้งหมด :
      <NumberFormat
        style={{ marginLeft: "20px", marginRight: "20px" }}
        value={totalCr}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"฿"}
      />
      บาท
    </h5>
  </div>
)
