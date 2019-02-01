import React, { useState, useEffect } from "react"
import { deleteAccType, getAccType } from "../services/categoryS"
export const CateShowList = () => {
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
