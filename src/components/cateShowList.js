import React, { useState, useEffect } from "react"
import { billAll } from "../services/categoryS"
import NumberFormat from "react-number-format"
import { SreactData } from "../logic/sreactData"
import { Link } from "react-router-dom"
import { Loadding } from "../App"
const dataHandlerFunc = (tempArr, data) =>
  tempArr.map(id_type => {
    const dataDo = data.filter(d => d.id == id_type)
    const drTotal = dataDo.reduce((sum, d) => sum + parseInt(d.dr), 0)
    const crTotal = dataDo.reduce((sum, d) => sum + parseInt(d.cr), 0)
    const crNow = crTotal - drTotal < 0 ? 0 : crTotal - drTotal
    const drNow = drTotal - crTotal < 0 ? 0 : drTotal - crTotal
    return {
      id_type,
      name_type: dataDo.map(nn => nn.name_type)[0],
      drTotal: drTotal,
      crTotal: crTotal,
      crNow,
      drNow
    }
  })

const getApiOfBill = (setsreachYA, setTempArr, setTempArrReadO) => {
  useEffect(() => {
    console.log(2)
    billAll()
      .then(res => {
        // console.log(data)
        const { data } = res.data
        const result = data.map(d => {
          return {
            ...d,
            date_is: parseInt(d.date_is)
          }
        })
        // console.log(data)
        const yearSreach = new SreactData(result).findUniQYear()
        document.getElementById("loadding_bk").style.display = "none"

        setsreachYA(yearSreach)

        setTempArr(result)
        setTempArrReadO(result)
      })
      .catch(e => (window.location.href = "/#/error"))
  }, [])
}
const calCrAndDrTotalAndNow = (
  setTotalCr,
  setTotalDr,
  setTotalCrNow,
  setTotalDrNow,
  dataHandler
) => {
  const totalCrCal = dataHandler.reduce((sum, data) => sum + data.cr, 0)
  const totalDrCal = dataHandler.reduce((sum, data) => sum + data.dr, 0)
  const totalCrNowC = totalCrCal - totalDrCal < 0 ? 0 : totalCrCal - totalDrCal
  const totalDrNowC = totalDrCal - totalCrCal < 0 ? 0 : totalDrCal - totalCrCal
  setTotalCr(totalCrCal)
  setTotalDr(totalDrCal)
  setTotalCrNow(totalCrNowC)
  setTotalDrNow(totalDrNowC)
}
const sreahFindYear = (
  setTotalCr,
  setTotalDr,
  setTotalCrNow,
  setTotalDrNow,
  setsreachMA,
  setDataCate,
  setTempArr,
  sreachYear,
  tempArr
) => {
  useEffect(
    () => {
      if (sreachYear) {
        const dataHandler = tempArr.filter(
          d => new Date(d.date_is).getFullYear() === parseInt(sreachYear)
        )
        console.log(3)

        console.log({ dataHandler })
        const typeEact = dataHandler
          .map(d => parseInt(d.id))
          .sort()
          .filter((item, index, l) => l.indexOf(item) === index)

        const setMonth = new SreactData().findUniQMonth(dataHandler)
        const setData = dataHandlerFunc(typeEact, dataHandler)
        /** ----- */
        calCrAndDrTotalAndNow(
          setTotalCr,
          setTotalDr,
          setTotalCrNow,
          setTotalDrNow,
          dataHandler
        )
        /** ----- */
        setsreachMA(setMonth)
        setDataCate(setData)
        setTempArr(dataHandler)
      }
    },
    [sreachYear]
  )
}
const sreachFindMonth = (
  setTotalCr,
  setTotalDr,
  setTotalCrNow,
  setTotalDrNow,
  setDataCate,
  sreachM,
  tempArr
) => {
  useEffect(
    () => {
      if (sreachM) {
        const dataHandler = tempArr.filter(
          d =>
            new SreactData().filterMonth(new Date(d.date_is).getMonth()) ===
            sreachM
        )
        console.log(4)

        const typeEact = dataHandler
          .map(d => parseInt(d.id))
          .sort()
          .filter((item, index, l) => l.indexOf(item) === index)
        const setData = dataHandlerFunc(typeEact, dataHandler)
        /** ----- */
        calCrAndDrTotalAndNow(
          setTotalCr,
          setTotalDr,
          setTotalCrNow,
          setTotalDrNow,
          dataHandler
        )
        /** ----- */
        setDataCate(setData)
      }
    },
    [sreachM]
  )
}
const setFindTestCase = (
  typeSeleted,
  setTempArr,
  tempArrReadO,
  setsreachY,
  setsreachM,
  setDataCate,
  setsreachMA
) => {
  useEffect(
    () => {
      // console.log("start 1", typeSeleted, typeof typeSeleted)
      setsreachY(0)
      setsreachM(0)
      setTempArr(tempArrReadO)
      setDataCate([])
      setsreachMA([])
      if (typeSeleted === "1") {
        const hanlerData = tempArrReadO.filter(d => {
          const id_type = parseInt(d.id)
          return 100 <= id_type && id_type <= 399
        })
        // console.log({ hanlerData })

        setTempArr(hanlerData)
      } else if (typeSeleted === "2") {
        const hanlerData = tempArrReadO.filter(d => {
          const id_type = parseInt(d.id)
          return 400 <= id_type && id_type <= 599
        })
        // console.log({ hanlerData })
        setTempArr(hanlerData)
      }
    },
    [typeSeleted]
  )
}
const handlerStringTital = type => {
  switch (type) {
    case "all": {
      return "งบทดลองก่อนปิด"
    }
    case "1": {
      return "งบทดลองหลังปิด"
    }
    case "2": {
      return "งบกำไรขาดทุน"
    }
    default:
      return "error"
  }
}
export const CateShowList = ({ typeSeleted }) => {
  const [dataCate, setDataCate] = useState([])
  const [tempArr, setTempArr] = useState([])
  const [tempArrReadO, setTempArrReadO] = useState([])
  const [sreachMA, setsreachMA] = useState([])
  const [sreachYA, setsreachYA] = useState([])
  const [sreachM, setsreachM] = useState(0)
  const [sreachYear, setsreachY] = useState(0)

  const [canClicked, setCanClick] = useState(false)
  const [totalCrPlus, setTotalCr] = useState(0)
  const [totalDrPlus, setTotalDr] = useState(0)
  const [totalCrNow, setTotalCrNow] = useState(0)
  const [totalDrNow, setTotalDrNow] = useState(0)
  const title = handlerStringTital(typeSeleted)
  setFindTestCase(
    typeSeleted,
    setTempArr,
    tempArrReadO,
    setsreachY,
    setsreachM,
    setDataCate,
    setsreachMA
  )

  getApiOfBill(setsreachYA, setTempArr, setTempArrReadO)
  sreahFindYear(
    setTotalCr,
    setTotalDr,
    setTotalCrNow,
    setTotalDrNow,
    setsreachMA,
    setDataCate,
    setTempArr,
    sreachYear,
    tempArr
  )
  sreachFindMonth(
    setTotalCr,
    setTotalDr,
    setTotalCrNow,
    setTotalDrNow,
    setDataCate,
    sreachM,
    tempArr
  )

  return (
    <div style={{ padding: "20px" }}>
      <Loadding />
      <h5 className="font_white"> ค้นหางบทดลอง {title} </h5>

      <div className="p-3">
        <label className="font_white">เลือกปีที่ต้องการแสดง</label>
        <select
          className="form-control"
          value={sreachYear}
          onChange={e => setsreachY(e.target.value)}
        >
          <option>เลือกปีที่ต้องการแสดง</option>
          {sreachYA.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {sreachMA.length ? (
        <div className="p-3">
          <label className="font_white">ค้นหาจากเดือน</label>
          <select
            className="form-control"
            value={sreachM}
            onChange={e => setsreachM(e.target.value)}
          >
            <option>Sreach</option>
            {sreachMA.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
      <h1 className="font_white"> หมวดหมู่ </h1>
      <div style={{ overflow: "auto", height: "300px" }}>
        {dataCate.length ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th> เลขบัญชี </th>
                  <th> ชื่อบัญชี </th>
                  <th> เครดิต </th>
                  <th> เดบิต </th>
                  <th> เหลือเครดิต </th>
                  <th> เหลือเดบิต </th>

                  {/* <th> ลบ </th>  */}
                </tr>
              </thead>
              <tbody>
                {dataCate.map((d, i) => (
                  <tr key={i}>
                    <td className="font_white"> {d.id_type}</td>
                    <td className="font_white"> {d.name_type}</td>
                    <td className="font_white">
                      <NumberFormat
                        value={d.crTotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                    <td className="font_white">
                      <NumberFormat
                        value={d.drTotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                    <td className="font_white">
                      {" "}
                      <NumberFormat
                        value={d.crNow}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                    <td className="font_white">
                      {" "}
                      <NumberFormat
                        value={d.drNow}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3">
              <h5 className="font_white">
                {" "}
                ยอดของเดบิตทั้งหมด :{" "}
                <NumberFormat
                  value={totalDrPlus}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />{" "}
              </h5>
              <h5 className="font_white">
                {" "}
                ยอดของเดรดิตทั้งหมด :{" "}
                <NumberFormat
                  value={totalCrPlus}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />{" "}
              </h5>

              <h5 className="font_white">
                {" "}
                ยอดคงเหลือเคดริต :{" "}
                <NumberFormat
                  value={totalCrNow}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </h5>
              <h5 className="font_white">
                {" "}
                ยอดคงเหลือเคดริต :{" "}
                <NumberFormat
                  value={totalDrNow}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </h5>
            </div>
          </div>
        ) : (
          <h3 className="font_white text-center mt-4"> Data IS Empty... </h3>
        )}
      </div>
      {canClicked ? (
        <div>
          <Link to="/addCate" className="btn btn-success">
            เพิ่มหมวดหมู่
          </Link>
          <button
            onClick={e => {
              setDataCate([])
              setCanClick(false)
            }}
            className="btn btn-primary"
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
