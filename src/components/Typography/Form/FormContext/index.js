import React, { createContext, useContext } from 'react'

// 1. 创建 Context
const FormContext = createContext({
  nameCol: { span: 4 },
  valueCol: { span: 20 }
})

export default FormContext
