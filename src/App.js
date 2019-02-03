import React, { useReducer } from "react"

import "./App.css"
import { Form, FromAcc } from "./components/form"
import { HashRouter, Route, Link } from "react-router-dom"
import { FormBill } from "./components/formBill"
import { List } from "./components/listAddBill"
import { HomePage } from "./components/homePage"
import { reducerFirst, typeRedecer } from "./reducers/reducer.bill"

const App = () => {
  return (
    <div className="bk-black">
      <Route path="/error" component={errPage} />

      <div className="row">
        <div className="col-0 col-md-3">
          <NavBar />
        </div>
        <div className="col-12 col-md-9">
          <Route path="/home" component={HomePage} />
          <Route path="/addAcc" component={AddAccountenCy} />
          <Route path="/addCate" component={addCateroGey} />
          <Route path="/error" component={addCateroGey} />
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
const errPage = () => (
  <div className="errPage">
    <div className="text-center">
      <h1 className="p-3">Error Page...</h1>
      <p>เซิฟเวอร์มีปัญหาขอเวลาอีกไม่นาน...</p>
      <div className="text-center">
        <Link className="btn btn-primary" to="/home">
          Try Agian.
        </Link>
      </div>
    </div>
  </div>
)
const AddAccountenCy = () => {
  const [state, dispatch] = useReducer(reducerFirst, typeRedecer)
  // useE
  return (
    <div className="components">
      <div className="mt-3">
        <List list={state.accArr} state={state} dispatch={dispatch} />
      </div>

      <h2 className="text-center font_white p-3"> Add Accountancy </h2>
      <div className="row">
        <div className="col-12 col-md-6">
          <Form state={state} dispatch={dispatch} />
        </div>
        <div className="col-12 col-md-6">
          <FormBill state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}
const addCateroGey = () => (
  <div className="components">
    <h2 className="text-center font_white p-3"> Add Cateroge </h2>
    <div className="row">
      <div className="col-12 ">
        <FromAcc />
      </div>
    </div>
  </div>
)
const NavBar = () => {
  return (
    <div
      style={{
        background: "rgba(216, 207, 69 , 1)",
        minHeight: "1000px"
      }}
    >
      <h2 style={{ padding: "20px" }} className="text-center font_black">
        Accountancy
      </h2>
      <nav className="nav flex-column ">
        <Link className="nav-link font_black ml-4" to="/home">
          <i className="fas fa-home" /> หน้าหลัก
        </Link>
        <Link className="nav-link font_black ml-4" to="/addAcc">
          <i className="fas fa-plus" /> เพิ่มบิล
        </Link>
        <Link className="nav-link font_black ml-4" to="/addCate">
          <i className="fas fa-plus" /> เพิ่มหมวดหมู่
        </Link>
      </nav>
    </div>
  )
}
export const Loadding = () => (
  <div id="loadding_bk" className="loadding_bk">
    <div className="loadingDiv">
      <div className="loading">
        <div className="loadingSamll">
          <small>Loading</small>{" "}
        </div>
      </div>
    </div>
  </div>
)
const AppRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
)
export default AppRouter
