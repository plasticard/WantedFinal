import React from "react"
import { View, ActivityIndicator } from "react-native"
const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  )
}
export default Initializing
