import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { postBillToServer } from "../services/categoryS"

export const List = ({ list, state, dispatch }) => {
  // console.log(list)
  const [buttonClick, setBtnClick] = useState(false)
  let listTable = (
    <p style={{ color: "white", textAlign: "center" }}>
      คุณยังไม่ได้เพิ่มข้อมูลเลยนะ
    </p>
  )

  let drTotal = list.reduce((sum, data) => sum + parseInt(data.dr), 0)
  let crTotal = list.reduce((sum, data) => sum + parseInt(data.cr), 0)

  function saveToDb(e) {
    setBtnClick(true)
    const { id_bill, dateIs, detail, accArr, id_doc } = state
    //eslint-disable-next-line
    if (confirm("ต้องการบันทึกจริงๆใช่ไหม ?")) {
      console.log({ state })

      if (id_bill && dateIs && accArr.length && id_doc) {
        // console.log({ state })
        const totalDr = accArr.reduce((sum, data) => sum + parseInt(data.dr), 0)
        const totalCr = accArr.reduce((sum, data) => sum + parseInt(data.cr), 0)
        console.log({ totalCr, totalDr, accArr })
        if (totalDr === totalCr) {
          // console.log("Hi")
          const dataToServer = {
            id_bill,
            dateIs,
            detail,
            accArr,
            totalDr,
            totalCr,
            id_doc
          }
          postBillToServer(dataToServer)
            .then(d => {
              const message = d.data.message
              window.location.href = "/#/home?message=" + message
              setBtnClick(false)
            })
            .catch(e => {
              console.log({ e })
              alert("เกิดข้อผิดพลาดทางระบบ.")
              setBtnClick(false)
            })
        } else {
          alert("เดบิต และ เครดิตต้องเท่ากัน")
          setBtnClick(false)
        }
      }
    } else {
      setBtnClick(false)
    }
  }
  function deleteBill(index) {
    dispatch({ type: "DELETE BILL", payload: { id_bill: index } })
  }
  console.log(list)
  if (list.length) {
    listTable = (
      <div>
        <div style={{ overflow: "scroll", height: "300px" }}>
          <table className="table font_white ">
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
              {list.map((d, i) => (
                <tr key={i}>
                  <td> {d.id_acc} </td>
                  <td> {d.type} </td>

                  <td>
                    <NumberFormat
                      value={d.dr}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </td>

                  <td>
                    <NumberFormat
                      value={d.cr}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </td>
                  <td>
                    <strong
                      onClick={e => deleteBill(i)}
                      style={{ color: "red" }}
                    >
                      <i className="fas fa-times" />
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <label className="font_white text_lg"> เดบิต </label>
          &nbsp;
          <NumberFormat
            value={drTotal}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"฿"}
            className="font_white text_lg"
          />
          &nbsp;
          <label className="font_white text_lg">บาท</label>
          &nbsp;
          <label className="font_white text_lg"> เครดิต </label>
          &nbsp;
          <NumberFormat
            value={crTotal}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"฿"}
            className="font_white text_lg"
          />
          &nbsp;
          <label className="font_white text_lg">บาท</label>
        </div>
        <div className="md-form">
          <button
            onClick={e => saveToDb(e)}
            disabled={buttonClick}
            className="btn btn-block btn-primary"
          >
            {buttonClick ? "Clicked..." : " Save All Data To DataBase."}
          </button>
        </div>
      </div>
    )
  }
  return listTable
}
