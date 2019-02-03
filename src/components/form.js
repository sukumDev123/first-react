// const Form = () =>
import React, { useState, useEffect } from "react"
import { postCategory, getAccType } from "../services/categoryS"

export const Form = ({ state, dispatch }) => {
  const [id_bill, setIdBill] = useState(0)
  const [date, setDate] = useState("")
  const [detail, setDetaill] = useState("")
  const [id_doc, setIdDoc] = useState("")
  function subMitBillData(e) {
    e.preventDefault()
    if (id_bill && date) {
      const dateIsNumber = +new Date(date)
      const dataToRe = {
        id_bill,
        dateIs: dateIsNumber,
        detail: detail,
        id_doc: id_doc
      }
      dispatch({ type: "ADD DATE IS BILL", payload: dataToRe })
    }
  }
  return (
    <form onSubmit={subMitBillData} className="bk_acc">
      <div className="md-form">
        <label className="font_black">เลขที่รายการ</label>
        <input
          type="text"
          placeholder="Input you id buill"
          className="form-control"
          onChange={e => setIdBill(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_black">อ้างอิงเอกสาร</label>
        <input
          type="text"
          className="form-control"
          placeholder="อ้างอิงเอกสาร"
          onChange={e => setIdDoc(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_black">วันที่</label>
        <input
          type="date"
          className="form-control"
          onChange={e => setDate(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_black">รายละเอียด</label>

        <input
          type="text"
          placeholder="Detaill..."
          className="form-control"
          onChange={e => setDetaill(e.target.value)}
          // {state.setInfor ? "readOnly" : ""}
          readOnly={state.setInfor ? true : false}
        />
      </div>

      <button
        type="submit"
        disabled={state.setInfor}
        className="btn btn-block btn-primary"
      >
        Save
      </button>
      {state.setInfor ? (
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={e => dispatch({ type: "EDIT INFOR BILL" })}
        >
          แก้ไข
        </button>
      ) : (
        ""
      )}
      <div />
    </form>
  )
}

export const FromAcc = () => {
  const [idAcc, setIdAcc] = useState(0)
  const [nameType, setNameT] = useState("")
  const [id_catgory, setC] = useState(0)
  const [categoryName, setCN] = useState("")
  const [clickBoolean, setClickBoolean] = useState(false)
  const [tableType, setTbType] = useState([])

  function submitAcc(e) {
    e.preventDefault()
    setClickBoolean(true)
    if (
      idAcc &&
      nameType &&
      typeof parseInt(id_catgory) == "number" &&
      categoryName
    ) {
      tableType.forEach(d => {
        if (d.id != idAcc) {
          postCategory({
            id_acc: idAcc,
            name_type: nameType,
            id_catgory,
            categoryName
          })
            .then(respose => {
              getAccType()
                .then(d => {
                  const { data } = d.data
                  setTbType(data)
                  alert(respose.data.message || "add success.")
                  setNameT("")
                  setC(0)
                  setCN("")
                  setClickBoolean(false)
                })
                .catch(e => {
                  window.location.href = "/#/error"
                })
            })
            .catch(err => {
              console.log({ err })
              alert("Server is problem.")
              setClickBoolean(false)
            })
        } else {
          alert("เลขบัญชีนี้มีรายารอยู่แล้ว")
          setClickBoolean(false)
        }
      })
    } else {
      alert("ใส่ข้อมูลให้ครบ")
      setClickBoolean(false)
    }
  }
  return (
    <div className="col-12 col-md-8 " style={{ margin: "auto" }}>
      <form onSubmit={submitAcc} className="bk_acc">
        <div className="md-form">
          <label className="font_black"> เลขที่บัญชี </label>
          <input
            className="form-control"
            type="number"
            value={idAcc}
            placeholder="เลขที่บัญชี"
            onChange={e => setIdAcc(e.target.value)}
          />
        </div>
        <div className="md-form">
          <label className="font_black"> ชื่อบัญชี </label>
          <input
            className="form-control"
            type="text"
            value={nameType}
            placeholder="ชื่อบัญชี"
            onChange={e => setNameT(e.target.value)}
          />
        </div>
        <div className="md-form">
          <label className="font_black"> หมวด </label>
          <input
            className="form-control"
            type="number"
            value={id_catgory}
            onChange={e => setC(e.target.value)}
          />
          <small className="font_black"> * รหัสหมวดหมู่มีชนิดเป็นตัวเลข </small>
        </div>
        <div className="md-form">
          <label className="font_black"> ชื่อหมวด </label>
          <input
            className="form-control"
            type="text"
            value={categoryName}
            placeholder="ชื่อหมวด"
            onChange={e => setCN(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button
            disabled={clickBoolean}
            type="submit"
            className="btn btn-block btn-primary"
          >
            {clickBoolean ? "Clicked..." : "Add new Category"}
          </button>
        </div>
      </form>
      <div className="mt-5" style={{ overflow: "auto", height: "300px" }}>
        <ShowBillType tableType={tableType} setTbType={setTbType} />
      </div>
    </div>
  )
}
const ShowBillType = ({ tableType, setTbType }) => {
  useEffect(() => {
    getAccType()
      .then(d => {
        const { data } = d.data
        setTbType(data)
      })
      .catch(e => {
        window.location.href = "/#/error"
      })
  }, [])
  return (
    <table className="table">
      <thead>
        <tr>
          <th> เลขที่บัญชี </th>
          <th> ชื่อบัญชี </th>
          <th> รหัสหมวดหมู่ </th>
          <th> ชื่อหมวดหมู่ </th>
        </tr>
      </thead>
      <tbody>
        {tableType.map((d, i) => (
          <tr key={i}>
            <td className="font_white"> {d.id} </td>
            <td className="font_white"> {d.name_type} </td>
            <td className="font_white"> {d.id_category} </td>
            <td className="font_white"> {d.category} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
