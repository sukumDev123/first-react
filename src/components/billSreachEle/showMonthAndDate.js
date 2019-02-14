import React, { useEffect, useState } from "react"
import { billAll, deleteAllOFBill } from "../../services/categoryS"
import { SreactData } from "../../logic/sreactData"
import NumberFormat from "react-number-format"

import { Loadding } from "../../App"
import { ShowEditBill } from "./editBillData"
const getBillData = (setYearArr, setTempArr, sreactData) => {
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
      .catch(e => {
        window.location.href = "/#/error"
      })
  }, [])
}
const sreachYearData = (
  setMonthUni,
  setDataBill,
  tempArr,
  sreactData,
  yearUniSeleted
) => {
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
}
const sreachMonth = (setBillTable, sreactData, dataBill, monthUniSelected) => {
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
}
export const ShowMonthAndDate = () => {
  const [dataBill, setDataBill] = useState([])
  const [monthUni, setMonthUni] = useState([])
  const [monthUniSelected, setMUS] = useState("0")
  const [yearUniSeleted, setYUS] = useState("0")
  const [yearArr, setYearArr] = useState([])
  const [showBillTable, setBillTable] = useState([])
  const sreactData = new SreactData()
  const [tempArr, setTempArr] = useState([])

  const [editData, setEditData] = useState([])
  getBillData(setYearArr, setTempArr, sreactData)
  sreachYearData(setMonthUni, setDataBill, tempArr, sreactData, yearUniSeleted)
  sreachMonth(setBillTable, sreactData, dataBill, monthUniSelected)
  return (
    <div className="bkShow_Fixed">
      <Loadding />

      <div>
        <h5 className="font_white">ค้นหารายการบิล</h5>
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
      <div className="p-3" style={{ overflow: "auto", height: "300px" }}>
        {showBillTable.length
          ? showBillTable.map((d, index) => {
              const { dataArr, totalCr, totalDr } = d
              const { arrInfo } = dataArr

              return (
                <TableBillSreach
                  key={index}
                  dataArr={dataArr}
                  totalCr={totalCr}
                  totalDr={totalDr}
                  dataInfo={arrInfo}
                  index={index}
                  showBillTable={showBillTable}
                  setBillTable={setBillTable}
                  setEditData={setEditData}
                />
              )
            })
          : ""}
      </div>
      {editData.length ? (
        <ShowEditBill editData={editData} setDataForm={setEditData} />
      ) : (
        ""
      )}
    </div>
  )
}
export const dateHandler = dateIs => {
  const dateN = new Date(dateIs)
  const dateForMat = `${dateN.getDate()}-${new SreactData().filterMonth(
    dateN.getMonth()
  )}-${dateN.getFullYear()}`
  return dateForMat
}

const TableBillSreach = ({
  dataArr,
  totalCr,
  totalDr,
  dataInfo,
  index,
  showBillTable,
  setBillTable,
  setEditData
}) => {
  function deleteByIdBill(id_bill, index) {
    // alert(id_bill)
    // eslint-disable-next-line
    if (confirm(`ต้องการลบบิลรหัสที่ : ${id_bill} นี้หรือไม่ ?`)) {
      deleteAllOFBill(id_bill).then(dataM => {
        const { message } = dataM.data
        alert(message)
        showBillTable.splice(index, 1)
        setBillTable(showBillTable)
      })
    }
  }
  return (
    <div className="mt-3 mb-3 borderTable " key={index}>
      <h4 className="font_white">รหัสบิล : {dataArr.id_bill}</h4>
      <h4 className="font_white">วันที่ : {dateHandler(dataArr.date_is)}</h4>
      <h4 className="font_white"> รายละเอียด : </h4>
      <p className="font_white ml-3">{dataArr.detail}</p>
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
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </td>
              <td className="font_white">
                <NumberFormat
                  value={drCr.cr}
                  decimalScale={2}
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
          decimalScale={2}
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
          decimalScale={2}
          prefix={"฿"}
        />
        บาท
      </h5>
      <button
        className="btn btn-danger"
        onClick={e => deleteByIdBill(dataArr.id_bill, index)}
        style={{ cursor: "pointer" }}
      >
        ลบบิลที่ ​: {dataArr.id_bill}
      </button>
      <button
        className="btn btn-secondary"
        onClick={e => setEditData([dataArr])}
        style={{ cursor: "pointer" }}
      >
        แก้ไข ​: {dataArr.id_bill}
      </button>
    </div>
  )
}
