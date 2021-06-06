import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

import navigationTheme from "./app/navigation/navigationTheme"
import AppNavigator from "./app/navigation/AppNavigator"

import Amplify from "aws-amplify"
import config from "./src/aws-exports"
Amplify.configure(config)
import { withAuthenticator } from "aws-amplify-react-native"

const App = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  )
}
export default withAuthenticator(App)
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#f8f4f4",
  },
})
