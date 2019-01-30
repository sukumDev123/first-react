import React, { useState, useEffect } from "react"
import {
  getAccType,
  billAll,
  deleteOnceBill,
  deleteAllOFBill,
  deleteAccType
} from "../services/categoryS"
import NumberFormat from "react-number-format"

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
const BillListShow = () => {
  const [datatBill, setDataBill] = useState([])
  const [showBill, setShowBill] = useState([])
  const [findBill, setfindBill] = useState("all")
  const [tempArr, setTempArr] = useState([])
  const [dateUni, setDateUni] = useState([])
  const [findByDate, setFindByDate] = useState("0")
  const [dateData, setDateData] = useState([])
  const [findStatusDate, setStatueDate] = useState(false)
  useEffect(() => {
    billAll()
      .then(res => {
        const { data } = res.data
        const setN = data
          .map(d => {
            const dateV = new Date(parseInt(d.date_is))
            const dateForMat = `${dateV.getDate()}/${dateV.getMonth() +
              1}/${dateV.getFullYear()}`

            return {
              ...d,
              date_is: dateForMat
            }
          })
          .sort((a, b) => a.id_bill - b.id_bill)
        setDataBill(setN)
        const dateAll = setN
          .map(d => d.date_is)
          .filter((item, index, arr) => arr.indexOf(item) === index)
        setDateUni(dateAll)
        const dataShowSimple = setN
          .map(d => d.id_bill)
          .filter((item, index, all) => all.indexOf(item) === index)
          .sort()
        setShowBill(dataShowSimple)
        setTempArr(setN)
      })
      .catch(e => console.log(e))
  }, [])
  useEffect(
    () => {
      setStatueDate(true)
      const getData = dateData.filter(d => d.id_bill === parseInt(findBill))

      setDataBill(getData)
    },
    [findBill]
  )
  useEffect(
    () => {
      if (findByDate === "all") {
        setDataBill(tempArr)
        setStatueDate(false)
        setDateData([])
      } else {
        setStatueDate(false)
        const getByDate = tempArr.filter(d => d.date_is === findByDate)
        setDataBill(getByDate)
        setDateData(getByDate)
        console.log({ dateData })
      }
    },
    [findByDate]
  )
  function deleteBillD(id_billS, i) {
    // eslint-disable-next-line
    if (confirm(`ต้องการลบรายการนี้จริงหรือไม่ `)) {
      datatBill.splice(i, 1)
      setDataBill(datatBill)
      deleteOnceBill(id_billS)
        .then(d => alert(d.data.message))
        .catch(e => console.log({ e }))
    }
  }
  function deleteAllBill(id_bill) {
    // console.log({ id_bill })
    // eslint-disable-next-line
    if (confirm(`ต้องการลบบิลที่ ${id_bill} จริงหรือไม่ ? `)) {
      deleteAllOFBill(id_bill)
        .then(d => {
          alert(d.data.message)((window.location.href = "/#/home"))
        })
        .catch(e => console.log({ e }))
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="font_white"> รายการบิล </h1>
      <div>
        <label className="font_white"> ค้าหาจากวันที่ </label>
        <select
          value={findByDate}
          onChange={e => {
            // setfindBill("0")
            setFindByDate(e.target.value)
          }}
          className="form-control"
        >
          <option value="0">เลือกวันที่ที่จะแสดงบิล</option>
          <option value="all">แสดงทั้งหมด</option>

          {dateUni.map((d, i) => (
            <option key={i} value={d}>
              วันที่ {d}
            </option>
          ))}
        </select>
        {dateData.length ? (
          <div>
            <label className="font_white"> ค้นหารายการจาก Id บิล </label>
            <select
              value={findBill}
              onChange={e => {
                setfindBill(e.target.value)
              }}
              className="form-control"
            >
              <option value="0">เลือกรายการบิลที่จะแสดง</option>
              {showBill.map((d, i) => (
                <option key={i} value={d}>
                  เลขบิลที่ {d}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* dateUni */}

      <div style={{ overflow: "auto", height: "300px" }}>
        {datatBill.length ? (
          <table className="table">
            <thead>
              <tr>
                {/* <th> เลขบิล </th> */}
                <th> วันที่ </th>
                <th> เอกสาร </th>
                <th> รายละเอียด </th>

                <th> เลขบัญชี </th>

                <th> เดบิต </th>
                <th> เคดิต </th>
                <th> ลบ </th>
              </tr>
            </thead>
            <tbody>
              {datatBill.map((d, i) => (
                <tr key={i}>
                  {/* <td className="font_white">{d.id_bill}</td> */}
                  <td className="font_white">{d.date_is}</td>
                  <td className="font_white">{d.id_doc}</td>
                  <td className="font_white">{d.detail}</td>
                  <td className="font_white">{d.id_acc}</td>

                  <td className="font_white">
                    {" "}
                    <NumberFormat
                      value={d.dr}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </td>
                  <td className="font_white">
                    <NumberFormat
                      value={d.cr}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </td>
                  <td>
                    <strong
                      onClick={e => deleteBillD(d.id_bildD, i)}
                      style={{ color: "red" }}
                    >
                      <i className="fas fa-times" />
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="font_white text-center mt-4"> Data IS Empty... </h3>
        )}
        {findStatusDate ? (
          <div>
            <a href="/addAcc" className="btn btn-success">
              เพิ่มบิล
            </a>
            &nbsp; &nbsp;
            <button
              className="btn btn-danger"
              onClick={e => deleteAllBill(findBill)}
            >
              ลบ บิลที่ {findBill}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
const CateShowList = () => {
  const [dataCate, setDataCate] = useState([])
  useEffect(() => {
    getAccType().then(res => {
      // console.log(data)
      const { data } = res.data
      // console.log(data)
      setDataCate(data)
    })
  }, [])
  function deleteAccTypeF(id_acc, index) {
    // eslint-disable-next-line
    if (confirm("ต้องการลบหมดหมู่นี้ใช่ไหม ?")) {
      deleteAccType(id_acc)
        .then(d => {
          alert(d.data.message)
          dataCate.splice(index, 1)
          setDataCate(dataCate)
        })
        .catch(e => console.log({ e }))
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="font_white"> หมวดหมู่ </h1>
      <div style={{ overflow: "auto", height: "300px" }}>
        {dataCate.length ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th> เลขบัญชี </th>
                  <th> ชื่อบัญชี </th>
                  <th> หมู่ </th>
                  <th> ชื่อหมู่ </th>
                  <th> ลบ </th>
                </tr>
              </thead>
              <tbody>
                {dataCate.map((d, i) => (
                  <tr key={i}>
                    <td className="font_white"> {d.id}</td>
                    <td className="font_white"> {d.name_type}</td>
                    <td className="font_white"> {d.id_category}</td>
                    <td className="font_white"> {d.category}</td>
                    <td>
                      <storng
                        style={{ color: "red" }}
                        onClick={e => deleteAccTypeF(d.id, i)}
                      >
                        <i className="fas fa-times" />
                      </storng>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="/addCate" className="btn btn-success">
              เพิ่มหมวดหมู่
            </a>
          </div>
        ) : (
          <h3 className="font_white text-center mt-4"> Data IS Empty... </h3>
        )}
      </div>
    </div>
  )
}
