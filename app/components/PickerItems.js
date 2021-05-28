import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AppText from "./AppText"

const PickerItems = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style2={styles.text}>{label}</AppText>
    </TouchableOpacity>
  )
}

export default PickerItems

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
})
