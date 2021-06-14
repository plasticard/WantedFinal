import React from "react"
import { useFormikContext } from "formik"

import AppButton from "../AppButton"

const SubmitButton = ({ title, onPress2 }) => {
  const { handleSubmit } = useFormikContext()
  const combinedFunctions = () => {
    handleSubmit()
    onPress2 && onPress2()
  }

  return (
    <AppButton
      title={title}
      onPress={combinedFunctions}
      style2={{ marginTop: 10 }}
    />
  )
}

export default SubmitButton
