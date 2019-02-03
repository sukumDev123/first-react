import React, { useState, useEffect } from "react"
import { getAccType } from "../services/categoryS"
import NumberFormat from "react-number-format"

export const FormBill = ({ state, dispatch }) => {
  const [id_acc, setIdAcc] = useState("")
  const [acc, setAcc] = useState([])
  const [dr, setDr] = useState(0)
  const [cr, setCr] = useState(0)
  const [typeDetail, setTypeDetail] = useState("")
  useEffect(
    () => {
      if (acc.length) {
        if (id_acc) {
          const setTypeD = acc.filter(d => d.id === id_acc)[0]

          setTypeDetail(setTypeD.name_type || "")
        }
      }
    },
    [id_acc]
  )
  useEffect(() => {
    getAccType().then(d => {
      const { data } = d.data
      console.log({ data })
      setAcc(data)
    })
  }, [])

  function submitForm(e) {
    e.preventDefault()
    console.log(id_acc)
    if (id_acc) {
      const dataToAdd = { id_acc: id_acc, dr: dr, cr: cr, type: typeDetail }
      console.log(dataToAdd)

      dispatch({ type: "ADD ARRAY ACCOUNTENCY", payload: dataToAdd })
      setDr(0)
      setCr(0)
    } else {
      alert("กรุณาใส่ให้ครบทุกช่องก่อนกดเพิ่มเข้าไปใน รายการ")
    }
  }

  return (
    <div>
      <form onSubmit={submitForm} className="bk_acc">
        <div className="md-form">
          <label className="font_black"> รหัสบัญชี </label>

          <select
            onChange={e => setIdAcc(e.target.value)}
            className="form-control"
            placeholder="รหัสบัญชี"
          >
            <option value=""> กรุณาเลือกรายการ </option>
            {acc.length ? (
              acc.map((d, i) => (
                <option value={d.id} key={i}>
                  {d.id}
                </option>
              ))
            ) : (
              <option> Please add new type </option>
            )}
          </select>
        </div>
        <div className="md-form">
          <label className="font_black"> บัญชี </label>
          <input
            type="text"
            placeholder="รหัสบัญชี..."
            className="form-control"
            value={typeDetail}
            readOnly
          />
        </div>
        <div className="md-form">
          <label className="font_black"> เดบิต </label>
          <NumberFormat
            value={dr}
            className="form-control"
            onChange={e => setDr(e.target.value)}
            thousandSeparator={true}
          />
        </div>
        <div className="md-form">
          <label className="font_black"> เครดิต </label>

          <NumberFormat
            value={cr}
            className="form-control"
            onChange={e => setCr(e.target.value)}
            thousandSeparator={true}
          />
        </div>
        <div className="md-form mt-4">
          <button
            className="btn btn-block btn-primary"
            disabled={!state.setInfor}
            type="submit"
          >
            เพิ่มรายการ
          </button>
        </div>
      </form>
    </div>
  )
}
