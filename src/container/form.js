// const Form = () =>
import React, { useState } from "react"
import { postCategory } from "../services/categoryS"

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
    <form onSubmit={subMitBillData} className="border-off-form">
      <div className="md-form">
        <label className="font_white">เลขที่รายการ</label>
        <input
          type="text"
          placeholder="Input you id buill"
          className="form-control"
          onChange={e => setIdBill(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_white">อ้างอิงเอกสาร</label>
        <input
          type="text"
          className="form-control"
          placeholder="อ้างอิงเอกสาร"
          onChange={e => setIdDoc(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_white">วันที่</label>
        <input
          type="date"
          className="form-control"
          onChange={e => setDate(e.target.value)}
          readOnly={state.setInfor}
        />
      </div>
      <div className="md-form">
        <label className="font_white">รายละเอียด</label>

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
  const [idAcc, setIdAcc] = useState("")
  const [nameType, setNameT] = useState("")
  const [id_catgory, setC] = useState(0)
  const [categoryName, setCN] = useState("")
  function submitAcc(e) {
    e.preventDefault()
    if (idAcc && nameType && id_catgory && categoryName) {
      postCategory({
        id_acc: idAcc,
        name_type: nameType,
        id_catgory,
        categoryName
      })
        .then(respose => {
          console.log({ respose })
          // setIdAcc("")
          setNameT("")
          setC(0)
          setCN("")
        })
        .catch(err => {
          console.log({ err })
        })
    } else {
      alert("Not ...")
    }
  }
  return (
    <div className="col-12 col-md-8" style={{ margin: "auto" }}>
      <form onSubmit={submitAcc} className="border-off-form">
        <div className="md-form">
          <label className="font_white"> เลขที่บัญชี </label>
          <input
            className="form-control"
            type="text"
            value={idAcc}
            onChange={e => setIdAcc(e.target.value)}
          />
        </div>
        <div className="md-form">
          <label className="font_white"> ชื่อบัญชี </label>
          <input
            className="form-control"
            type="text"
            value={nameType}
            onChange={e => setNameT(e.target.value)}
          />
        </div>
        <div className="md-form">
          <label className="font_white"> หมวด </label>
          <input
            className="form-control"
            type="text"
            value={id_catgory}
            onChange={e => setC(e.target.value)}
          />
        </div>
        <div className="md-form">
          <label className="font_white"> ชื่อหมวด </label>
          <input
            className="form-control"
            type="text"
            value={categoryName}
            onChange={e => setCN(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-block btn-primary">
            Add new Category
          </button>
        </div>
      </form>
    </div>
  )
}
