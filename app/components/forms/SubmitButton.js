import React from "react"
import { View, Text } from "react-native"
import { useFormikContext } from "formik"

import AppButton from "../AppButton"

const SubmitButton = ({ title, onPress2 }) => {
  const { handleSubmit } = useFormikContext()
  const combinedFunctions = () => {
    handleSubmit()
    onPress2()
  }

  return (
    <AppButton
      color="primary"
      text="white"
      title={title}
      onPress={() => combinedFunctions()}
      style2={{ marginTop: 10 }}
    />
  )
}

export default SubmitButton
