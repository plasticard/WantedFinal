import React from "react"
import { TouchableOpacity, StyleSheet, Platform } from "react-native"
import colors from "../config/colors"
import AppText from "./AppText"

export default AppButton = ({
  title,
  color = "white",
  text = "primary",
  onPress,
  width = "90%",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors[color], width: width },
      ]}
    >
      <AppText style2={[styles.text, { color: colors[text] }]}>{title}</AppText>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
