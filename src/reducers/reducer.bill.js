export const typeRedecer = {
  id_bill: "",
  dateIs: "",
  detail: "",
  accArr: [],
  type: "",
  id_doc: "",
  setInfor: false
}

export const reducerFirst = (state, action) => {
  switch (action.type) {
    case "ADD ARRAY ACCOUNTENCY": {
      const newDate = action.payload

      let newDateToTypeh = {
        ...newDate,
        cr:
          newDate.cr != 0
            ? parseInt(newDate.cr.split(",").reduce((sum, d) => sum + d, ""))
            : 0,
        dr:
          newDate.dr != 0
            ? parseInt(newDate.dr.split(",").reduce((sum, d) => sum + d, ""))
            : 0
      }

      return { ...state, accArr: [...state.accArr, newDateToTypeh] }
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

    default:
      return state
  }
}
