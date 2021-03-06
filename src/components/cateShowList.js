import React, { useState, useEffect } from "react"
import { billAll, getAllBIllByOneType } from "../services/categoryS"
import NumberFormat from "react-number-format"
import { SreactData } from "../logic/sreactData"
import { Link } from "react-router-dom"
import { Loadding } from "../App"

const dataHandlerFunc = (typeAcc, data) => {
  return typeAcc.map(id_type => {
    const dataDo = data.filter(d => d.id == id_type)
    const drTotal = dataDo.reduce((sum, d) => sum + parseFloat(d.dr), 0)
    const crTotal = dataDo.reduce((sum, d) => sum + parseFloat(d.cr), 0)
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
}
const handlerFuncionCall = typeSeleted => {
  if (typeSeleted === "all") return getAllBIllByOneType()
  return billAll()
}
const getApiOfBill = (
  setsreachYA,
  setTempArr,
  setTempArrReadO,
  typeSeleted
) => {
  useEffect(
    () => {
      document.getElementById("loadding_bk").style.display = "block"
      handlerFuncionCall(typeSeleted)
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
    },
    [typeSeleted]
  )
}
const calCrAndDrTotalAndNow = (setTotalCr, setTotalDr, dataHandler) => {
  const totalCrCal = dataHandler.reduce((sum, data) => sum + data.cr, 0)
  const totalDrCal = dataHandler.reduce((sum, data) => sum + data.dr, 0)
  setTotalCr(totalCrCal)
  setTotalDr(totalDrCal)
}
const calNowCr = (typeSeleted, setNowArrCrDr, controlCr, controlDr) => {
  if (typeSeleted === "1") {
    setNowArrCrDr({
      crNow: controlCr - controlDr > 0 ? controlCr - controlDr : 0,
      drNow: controlDr - controlCr > 0 ? controlDr - controlCr : 0
    })
  } else {
    setNowArrCrDr({
      crNow: controlCr,
      drNow: controlDr
    })
  }
}
const sreahFindYear = (
  setTotalCr,
  setTotalDr,
  setsreachMA,
  setDataCate,
  setTempArr,
  sreachYear,
  tempArr,
  setNowArrCrDr,
  typeSeleted
) => {
  useEffect(
    () => {
      if (sreachYear) {
        const dataHandler = tempArr.filter(
          d => new Date(d.date_is).getFullYear() === parseInt(sreachYear)
        )
        const typeEact = dataHandler
          .map(d => parseInt(d.id))
          .sort()
          .filter((item, index, l) => l.indexOf(item) === index)
        const setMonth = new SreactData().findUniQMonth(dataHandler)
        const setData = dataHandlerFunc(typeEact, dataHandler)
        const controlCr = setData.reduce((sum, d) => sum + d.crNow, 0)
        const controlDr = setData.reduce((sum, d) => sum + d.drNow, 0)
        calNowCr(typeSeleted, setNowArrCrDr, controlCr, controlDr)

        /** ----- */
        calCrAndDrTotalAndNow(setTotalCr, setTotalDr, dataHandler)
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
  setDataCate,
  sreachM,
  tempArr,
  setNowArrCrDr,
  typeSeleted
) => {
  useEffect(
    () => {
      if (sreachM) {
        const dataHandler = tempArr.filter(
          d =>
            new SreactData().filterMonth(new Date(d.date_is).getMonth()) ===
            sreachM
        )

        const typeEact = dataHandler
          .map(d => parseInt(d.id))
          .sort()
          .filter((item, index, l) => l.indexOf(item) === index)
        const setData = dataHandlerFunc(typeEact, dataHandler)
        const controlCr = setData.reduce((sum, d) => sum + d.crNow, 0)
        const controlDr = setData.reduce((sum, d) => sum + d.drNow, 0)
        calNowCr(typeSeleted, setNowArrCrDr, controlCr, controlDr)
        /** ----- */
        calCrAndDrTotalAndNow(setTotalCr, setTotalDr, dataHandler)
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

        setTempArr(hanlerData)
      } else if (typeSeleted === "2") {
        const hanlerData = tempArrReadO.filter(d => {
          const id_type = parseInt(d.id)
          return 400 <= id_type && id_type <= 599
        })
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
  const dffS = {
    dataCate: [],
    totalCrPlus: 0,
    totalDrPlus: 0,
    type: "",
    status: false
  }
  const [dataCate, setDataCate] = useState([])
  const [tempArr, setTempArr] = useState([])
  const [tempArrReadO, setTempArrReadO] = useState([])
  const [sreachMA, setsreachMA] = useState([])
  const [sreachYA, setsreachYA] = useState([])
  const [sreachM, setsreachM] = useState(0)
  const [sreachYear, setsreachY] = useState(0)
  const [nowArrCrDr, setNowArrCrDr] = useState({
    crNow: 0,
    drNow: 0
  })
  const [canClicked, setCanClick] = useState(false)
  const [totalCrPlus, setTotalCr] = useState(0)
  const [totalDrPlus, setTotalDr] = useState(0)
  const [showAllBillD, setShowAllBillD] = useState(dffS)
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

  getApiOfBill(setsreachYA, setTempArr, setTempArrReadO, typeSeleted)
  sreahFindYear(
    setTotalCr,
    setTotalDr,
    setsreachMA,
    setDataCate,
    setTempArr,
    sreachYear,
    tempArr,
    setNowArrCrDr,
    typeSeleted
  )
  sreachFindMonth(
    setTotalCr,
    setTotalDr,
    setDataCate,
    sreachM,
    tempArr,
    setNowArrCrDr,
    typeSeleted
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
                  <th> เดบิต </th>

                  <th> เครดิต </th>
                  <th> เหลือเดบิต </th>

                  <th> เหลือเครดิต </th>

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
                        value={d.drTotal}
                        decimalScale={2}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                    <td className="font_white">
                      <NumberFormat
                        value={d.crTotal}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>

                    <td className="font_white">
                      {" "}
                      <NumberFormat
                        value={d.drNow}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"฿"}
                      />{" "}
                    </td>
                    <td className="font_white">
                      {" "}
                      <NumberFormat
                        value={d.crNow}
                        decimalScale={2}
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
                  decimalScale={2}
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
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"฿"}
                />{" "}
              </h5>
              <h5 className="font_white">
                {" "}
                ยอดคงเหลือเคบิต :{" "}
                <NumberFormat
                  value={nowArrCrDr.drNow}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </h5>
              <h5 className="font_white">
                {" "}
                ยอดคงเหลือเครดิต:{" "}
                <NumberFormat
                  value={nowArrCrDr.crNow}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={"฿"}
                />
              </h5>
              <div className="md-5">
                {sreachM ? (
                  <button
                    className="btn btn-success"
                    onClick={e => {
                      setShowAllBillD({
                        dataCate,
                        totalCrPlus: nowArrCrDr.crNow,
                        totalDrPlus: nowArrCrDr.drNow,
                        type: typeSeleted,
                        status: true,
                        title: title
                      })
                    }}
                  >
                    แสดงรายการ
                  </button>
                ) : (
                  ""
                )}
              </div>
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
      {showAllBillD.status ? (
        <ShowDetailTableAll
          dataShow={showAllBillD}
          year={sreachYear}
          month={sreachM}
          setShowAllBillD={setShowAllBillD}
          dffS={dffS}
        />
      ) : (
        ""
      )}
    </div>
  )
}
const ShowDetailTableAll = ({
  dataShow,
  year,
  month,
  setShowAllBillD,
  dffS
}) => {
  switch (dataShow.type) {
    case "all":
      return (
        <Case1
          dataShow={dataShow}
          year={year}
          month={month}
          setShowAllBillD={setShowAllBillD}
          dffS={dffS}
        />
      )
    case "1":
      return (
        <Case1
          dataShow={dataShow}
          year={year}
          month={month}
          setShowAllBillD={setShowAllBillD}
          dffS={dffS}
        />
      )
    case "2":
      return (
        <Case2
          dataShow={dataShow}
          year={year}
          month={month}
          setShowAllBillD={setShowAllBillD}
          dffS={dffS}
        />
      )
    default:
      return <h1> Show</h1>
  }
}

const Case1 = ({ dataShow, year, month, setShowAllBillD, dffS }) => {
  const { dataCate } = dataShow
  const drTotal = dataCate.reduce((sum, d) => (sum += parseFloat(d.drNow)), 0)
  const crTotal = dataCate.reduce((sum, d) => (sum += parseFloat(d.drNow)), 0)

  const newSh = new SreactData().filterMonthS(month)
  const forMathData = `${newSh} ${month} ${year}`
  return (
    <div className="bkShowBillReal">
      {/* <h1 className="text-center mb-5 font_p">{title}</h1> */}
      <h1 className="mt-3 ml-3 backState" onClick={e => setShowAllBillD(dffS)}>
        <i className="fas fa-chevron-left" />
      </h1>
      <HeaderTable date_is={forMathData} />
      <div className="container mt-4">
        <table className="table_now table">
          <thead>
            <tr>
              <th>ชื่อบัญชี</th>
              <th>เลขบัญชี</th>
              <th>เดบิต</th>
              <th>เครดิต</th>
            </tr>
          </thead>
          <tbody>
            {dataCate.map((d, i) => {
              return (
                <tr key={i}>
                  <td> {d.name_type} </td>
                  <td> {d.id_type} </td>
                  <td>
                    {" "}
                    <NumberFormat
                      value={d.drNow}
                      decimalScale={2}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <NumberFormat
                      value={d.crNow}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />{" "}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td>
                {" "}
                <strong>คงเหลือ</strong>{" "}
              </td>
              <td />
              <td>
                {" "}
                <strong>
                  {" "}
                  <NumberFormat
                    value={drTotal}
                    decimalScale={2}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"฿"}
                  />
                </strong>{" "}
              </td>
              <td>
                {" "}
                <strong>
                  <NumberFormat
                    decimalScale={2}
                    value={crTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"฿"}
                  />
                </strong>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
const Case2 = ({ dataShow, year, month, setShowAllBillD, dffS }) => {
  const { dataCate } = dataShow
  const dataOfIncom = dataCate.filter(d => 400 <= d.id_type && d.id_type <= 500)
  const dataOfOutCome = dataCate.filter(
    d => 500 <= d.id_type && d.id_type <= 600
  )
  console.log({ dataOfIncom })
  const newSh = new SreactData().filterMonthS(month)
  const forMathData = `${newSh} ${month} ${year}`
  return (
    <div className="bkShowBillReal">
      <h1 className="mt-3 ml-3 backState" onClick={e => setShowAllBillD(dffS)}>
        <i className="fas fa-chevron-left" />
      </h1>
      <HeaderTable date_is={forMathData} />
      <div className="container">
        <TableIncomeT income_list={dataOfIncom} />
        <TableOutT out_comeList={dataOfOutCome} />
      </div>
    </div>
  )
}
const HeaderTable = ({ date_is }) => (
  <div className="container mt-4">
    <h1 className="text-center"> Company Name </h1>
    <h3 className="text-center mt-3"> Company Name ETC. </h3>
    <h5 className="text-center mt-4"> วันที่ : {date_is} </h5>
  </div>
)

const TableOutT = ({ out_comeList }) => {
  let totalI = 0
  return (
    <table className="table table_now">
      <thead>
        <tr>
          <th>ค่าใช้จ่าย</th>
          <th>จำนวนเงิน</th>
        </tr>
      </thead>
      <tbody>
        {out_comeList.map((d, i) => {
          const moneySeleted = d.crTotal ? d.crTotal : d.drTotal
          totalI += moneySeleted
          return (
            <tr key={i}>
              <td>{d.name_type}</td>
              <td>
                <NumberFormat
                  value={moneySeleted}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </td>
            </tr>
          )
        })}
        <tr>
          <td>
            <strong>รวม</strong>
          </td>
          <td>
            <strong>
              <NumberFormat
                value={totalI}
                decimalScale={2}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
const TableIncomeT = ({ income_list }) => {
  let totalO = 0
  return (
    <table className="table table_now">
      <thead>
        <tr>
          <th>รายได้</th>
          <th>จำนวนเงิน</th>
        </tr>
      </thead>
      <tbody>
        {income_list.map((d, i) => {
          const moneySeleted = d.crTotal ? d.crTotal : d.drTotal
          // setTI(totalIncome + moneySeleted)
          totalO += moneySeleted
          return (
            <tr key={i}>
              <td>{d.name_type}</td>
              <td>
                <NumberFormat
                  value={moneySeleted}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </td>
            </tr>
          )
        })}
        <tr>
          <td>
            <strong>รวม</strong>
          </td>
          <td>
            <strong>
              <NumberFormat
                value={totalO}
                decimalScale={2}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
