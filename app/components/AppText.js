import React from "react"
import { Text, StyleSheet, Platform } from "react-native"
import global from "../config/styles"

export default AppText = ({ children, style2, ...otherProps }) => {
  return (
    <Text style={[global.text, style2]} {...otherProps}>
      {children}
    </Text>
  )
}
