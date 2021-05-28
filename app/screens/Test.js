import React, { useState, useEffect } from "react"
import { StyleSheet, Button, View, Image } from "react-native"
import AppTextInput from "../components/AppTextInput"
import AppPicker from "../components/AppPicker"
import Screen from "../components/Screen"
import ImageInput from "../components/forms/ImageInput"
import ImageInputList from "../components/forms/ImageInputList"
import ImagePicker from "../components/forms/ImagePicker"

const Test = () => {
  const catego = [
    {
      label: "Furniture",
      value: 1,
    },
    {
      label: "Clothing",
      value: 2,
    },
    {
      label: "Cameras",
      value: 3,
    },
  ]
  const [category, setCategory] = useState(catego[0])

  return (
    <Screen>
      <AppTextInput placeholder="test" icon="email" />
      <AppPicker
        selected={category}
        onSelect={(item) => setCategory(item)}
        items={catego}
        placeholder="Category"
        icon="apps"
      />
      <ImagePicker />
    </Screen>
  )
}

export default Test

const styles = StyleSheet.create({})
