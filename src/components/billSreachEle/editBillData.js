import React, { useState, useEffect } from "react"
import { dateHandler } from "./showMonthAndDate"
import {
  getAccType,
  updateDataBill,
  deleteOnceBill,
  addOneBill
} from "../../services/categoryS"
import NumberFormat from "react-number-format"
// to Show First
export const ShowEditBill = ({ editData, setDataForm }) => {
  const dataBill = editData[0]
  dataBill.date_is = dateHandler(dataBill.date_is)
  const [editDataState, setEditData] = useState(dataBill)

  return (
    <div className="showEditBk">
      <div className="showEdit">
        <h5>รหัสบิลที่ : {editDataState.id_bill}</h5>
        <div className="row">
          <div className="col-12 col-md-6">
            <FormBillEdit
              editDataState={editDataState}
              setEditData={setEditData}
            />
          </div>
          <div className="col-12 col-md-6">
            <DataBillArr
              editDataStateA={editDataState}
              setEditData={setEditData}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-info" onClick={e => reloadPage()}>
        {" "}
        Reload Page{" "}
      </button>
      <button className="btn btn-danger" onClick={e => closePage(setDataForm)}>
        {" "}
        Close{" "}
      </button>
    </div>
  )
}
const reloadPage = () => {
  // eslint-disable-next-line
  location.reload()
}
const closePage = setDataForm => {
  setDataForm([])
}
const updateDataToServer = async editDataState => {
  try {
    const { id_bill } = editDataState
    const dataToS = {
      id_bill: editDataState.id_bill,
      detail: editDataState.detail,
      id_doc: editDataState.id_doc,
      date_is: +new Date(editDataState.date_is)
    }
    const resp = await updateDataBill(id_bill, dataToS)
    const { message } = resp.data
    alert(message)
  } catch (error) {
    alert("server is problem." + JSON.stringify(error))
  }
}
const FormBillEdit = ({ editDataState, setEditData }) => (
  <form>
    <div className="md-form">
      <label>รหัสบิล : </label>
      <input value={editDataState.id_bill} readOnly className="form-control" />
    </div>
    <div className="md-form">
      <label>เอกสารอ้างอิง : </label>

      <input
        value={editDataState.id_doc}
        onChange={e =>
          setEditData({
            ...editDataState,
            id_doc: e.target.value
          })
        }
        className="form-control"
      />
    </div>
    <div className="md-form">
      <label>วันที่ : </label>

      <input
        type="text"
        value={editDataState.date_is}
        className="form-control"
        readOnly
      />
    </div>
    <div className="md-form">
      <label>เลือกวันที่อื่น : </label>

      <input
        type="date"
        onChange={e =>
          setEditData({
            ...editDataState,
            date_is: dateHandler(e.target.value)
          })
        }
        className="form-control"
      />
    </div>
    <div className="md-form">
      <label>รายละเอียด : </label>

      <input
        type="text"
        value={editDataState.detail}
        onChange={e =>
          setEditData({
            ...editDataState,
            detail: e.target.value
          })
        }
        className="form-control"
      />
    </div>
    <button
      onClick={e => {
        e.preventDefault()
        updateDataToServer(editDataState)
      }}
      className="btn btn-primary btn-block"
    >
      {" "}
      Update data.{" "}
    </button>
  </form>
)
const DataBillArr = ({ editDataStateA, setEditData }) => {
  return (
    <div>
      <ShowCrDr dataBill={editDataStateA} />
      <div style={{ overflow: "auto", height: "300px" }}>
        <TableArrayBillD dataBill={editDataStateA} setEditData={setEditData} />
      </div>
      <FromAddNewBillD dataBill={editDataStateA} setEditData={setEditData} />
    </div>
  )
}
const ShowCrDr = ({ dataBill }) => {
  const totalDr = dataBill.arrInfo.reduce((sum, d) => sum + parseInt(d.dr), 0)
  const totalCr = dataBill.arrInfo.reduce((sum, d) => sum + parseInt(d.cr), 0)

  return (
    <div className="p-3">
      <h5>
        เดบิตทั้งหมด :{" "}
        <NumberFormat
          value={totalDr}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      </h5>
      <h5>
        เครดิตทั้งหมด :{" "}
        <NumberFormat
          value={totalCr}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      </h5>
    </div>
  )
}

const TableArrayBillD = ({ dataBill, setEditData }) => {
  const deleteTypeAcc = async (id, index, dataBill, setEditData) => {
    try {
      // eslint-disable-next-line
      if (confirm("ต้องการลบรายการนี้จริงหรือ ? ")) {
        const res = await deleteOnceBill(id)
        const { message } = res.data
        dataBill.arrInfo.splice(index, 1)
        setEditData(dataBill)
        alert(message)
      }
    } catch (error) {
      alert(`has problem : ` + JSON.stringify(error))
    }
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">เลขที่บัญชี</th>
          <th scope="col">ชื่อบัญชี</th>
          <th scope="col">เดบิต</th>
          <th scope="col">เครดิต</th>
          <th scope="col">ลบ</th>
        </tr>
      </thead>
      <tbody>
        {dataBill.arrInfo.map((d, i) => (
          <tr key={i}>
            <td className="font_white"> {d.id_acc} </td>
            <td className="font_white"> {d.category} </td>
            <td className="font_white">
              <NumberFormat
                value={d.dr}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </td>
            <td className="font_white">
              {" "}
              <NumberFormat
                value={d.cr}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />{" "}
            </td>
            <td
              className="font_white"
              onClick={e => deleteTypeAcc(d.id_bildD, i, dataBill, setEditData)}
            >
              <i className="fas fa-times" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const FromAddNewBillD = ({ dataBill, setEditData }) => {
  const [typeList, setTypeList] = useState([])
  const [newD, setNewD] = useState({
    id_acc: 0,
    category: "",
    dr: 0,
    cr: 0
  })
  findTypeFormData(setTypeList)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        subMitData(setEditData, newD, dataBill, setNewD)
      }}
    >
      <div className="md-form">
        <label>เลือกรหัสหมวดหมู่ : </label>

        <select
          className="form-control"
          onChange={e => {
            const nameType = typeList
              .filter(d => d.id == e.target.value)
              .map(d => d.category)[0]

            setNewD({
              ...newD,
              id_acc: e.target.value,
              category: nameType
            })
          }}
          value={newD.id_acc}
        >
          <option>Seleted</option>
          {typeList.map((d, i) => (
            <option key={i} value={d.id}>
              {d.id} {d.category}
            </option>
          ))}
        </select>
      </div>
      <div className="md-form">
        <label>ชื่อหมวดที่เลือก : </label>

        <input className="form-control" value={newD.category} readOnly />
      </div>
      <div className="md-form">
        <label>เดบิต : </label>

        <input
          type="number"
          className="form-control"
          onChange={e => {
            setNewD({
              ...newD,
              dr: e.target.value
            })
          }}
          value={newD.dr}
        />
      </div>
      <div className="md-form">
        <label>เครดิต : </label>

        <input
          type="number"
          className="form-control"
          onChange={e => {
            setNewD({
              ...newD,
              cr: e.target.value
            })
          }}
          value={newD.cr}
        />
      </div>
      <div className="md-form">
        <button className="btn btn-primary"> เพิ่ม </button>
      </div>
    </form>
  )
}
const getTypeAccService = async setTypeList => {
  try {
    const dataTypeA = await getAccType()
    const { data } = dataTypeA.data
    setTypeList(data)
  } catch (error) {
    alert("server is problem." + JSON.stringify(error))
  }
}
const findTypeFormData = setTypeList => {
  useEffect(() => {
    getTypeAccService(setTypeList)
  }, [])
}
const subMitData = async (setEditData, newData, dataBill, setNewD) => {
  try {
    if (newData.id_acc && (newData.dr || newData.cr)) {
      // eslint-disable-next-line
      if (confirm("ต้องการเพิ่มรายการนี้ใช่ไหม ?")) {
        const newDataA = {
          id_billD: dataBill.arrInfo[0].id_billD,
          cr: newData.cr,
          dr: newData.dr,
          id_acc: parseInt(newData.id_acc)
        }
        const resp = await addOneBill(newDataA)
        const { message } = resp.data
        dataBill.arrInfo.push(newData)
        setEditData(dataBill)
        setNewD({ id_acc: 0, category: "", dr: 0, cr: 0 })
        alert(message)
      }
    } else {
      alert("ข้อมูลผิดพลาดโปรดตรวจสอบ")
    }
  } catch (error) {
    alert("server is problem." + JSON.stringify(error))
  }
}
