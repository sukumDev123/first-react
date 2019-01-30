import React, { useReducer } from "react"

import "./App.css"
import { Form, FromAcc } from "./container/form"
import { HashRouter, Route, Link } from "react-router-dom"
import { FormBill } from "./container/formBill"
import { List } from "./container/listAddBill"
import { HomePage } from "./container/homePage"
import { reducerFirst, typeRedecer } from "./reducers/reducer.bill"

const App = () => {
  return (
    <div className="bk-black">
      <div className="row">
        <div className="col-0 col-md-3">
          <NavBar />
        </div>
        <div className="col-12 col-md-9">
          <Route path="/home" component={HomePage} />

          <Route path="/addAcc" component={AddAccountenCy} />
          <Route path="/addCate" component={addCateroGey} />
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

const AddAccountenCy = () => {
  const [state, dispatch] = useReducer(reducerFirst, typeRedecer)
  // useE
  return (
    <div className="container">
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
  <div className="container">
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
        {/* <a className="nav-link font_black ml-4" href="/home">
           
          </a>
          <a className="nav-link font_black ml-4" href="/addAcc">
            
          </a>
          <a className="nav-link font_black ml-4" href="/addCate">
           
          </a> */}
        <Link className="nav-link font_black ml-4" to="/home">
          <i className="fas fa-home" /> HomePage
        </Link>
        <Link className="nav-link font_black ml-4" to="/addAcc">
          <i className="fas fa-plus" /> Add Accountancy
        </Link>
        <Link className="nav-link font_black ml-4" to="/addCate">
          <i className="fas fa-plus" /> Add CategoryDashboard
        </Link>
        {/* <h5></h5> */}
      </nav>
    </div>
  )
}
const AppRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
)
export default AppRouter
