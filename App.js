import React, { useState, useEffect } from "react"
import { StyleSheet, ActivityIndicator, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

import navigationTheme from "./app/navigation/navigationTheme"
import AppNavigator from "./app/navigation/AppNavigator"
import AuthNavigator from "./app/navigation/AuthNavigator"
import Initializing from "./Initializing"
import Amplify, { Auth } from "aws-amplify"
import config from "./src/aws-exports"
Amplify.configure(config)

const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing")

  useEffect(() => {
    checkAuthState()
  }, [])
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser()
      console.log(" User is signed in")
      setUserLoggedIn("loggedIn")
    } catch (err) {
      console.log(" User is not signed in")
      setUserLoggedIn("loggedOut")
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn)
  }
  return (
    <NavigationContainer>
      {isUserLoggedIn === "initializing" && <Initializing />}
      {isUserLoggedIn === "loggedIn" && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === "loggedOut" && (
        <AuthNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  )
}

export default App
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#f8f4f4",
  },
})
