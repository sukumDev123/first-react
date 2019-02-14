export const typeRedecer = {
  id_bill: "",
  dateIs: "",
  detail: "",
  accArr: [],
  type: "",
  id_doc: "",
  setInfor: false,
  typeBill: ""
}

export const reducerFirst = (state, action) => {
  switch (action.type) {
    case "ADD ARRAY ACCOUNTENCY": {
      const newDate = action.payload

      return { ...state, accArr: [...state.accArr, newDate] }
    }
    case "ADD DATE IS BILL": {
      const { id_bill, dateIs, detail, id_doc } = action.payload
      console.log({ id_bill, dateIs, detail, id_doc })
      return { ...state, id_bill, dateIs, detail, id_doc, setInfor: true }
    }
    case "DELETE BILL": {
      const { id_bill } = action.payload
      state.accArr.splice(id_bill, 1)

      return state
    }
    case "EDIT INFOR BILL": {
      return {
        ...state,
        setInfor: false
      }
    }
    case "SET TYPE BILL": {
      return {
        ...state,
        typeBill: action.payload.typeBill
      }
    }

    default:
      return state
  }
}
