import axios from "axios"
import { host_api } from "./host"

export const postCategory = data =>
  axios.post(`${host_api}/api/acc/addAcc`, data)
export const getAccType = () => axios.get(`${host_api}/api/acc/allAcc`)
export const postBillToServer = data =>
  axios.post(`${host_api}/api/acc/addBill`, data)
export const billAll = () => axios.get(`${host_api}/api/acc/billAll`)
export const deleteOnceBill = id_billOne =>
  axios.delete(`${host_api}/api/acc/billDeleteOnce?id_billdD=${id_billOne}`)

export const deleteAllOFBill = id_bill =>
  axios.delete(`${host_api}/api/acc/billDeleteAll?id_bill=${id_bill}`)

export const deleteAccType = id_acc =>
  axios.delete(`${host_api}/api/acc/deleteAcc?id_acc=${id_acc}`)
