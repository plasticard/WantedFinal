import React, { useState, useEffect } from "react"
import { StyleSheet, View, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import navigationTheme from "./app/navigation/navigationTheme"
import AppNavigator from "./app/navigation/AppNavigator"
import AuthNavigator from "./app/navigation/AuthNavigator"
import Initializing from "./Initializing"
import { withAuthenticator } from "aws-amplify-react-native"

import Amplify, { Auth, DataStore } from "aws-amplify"
import { User } from "./src/models"
import config from "./src/aws-exports"
Amplify.configure(config)

const defaultImage =
  "https://pbs.twimg.com/profile_images/1391948633550069766/yveAkH6f_400x400.png"
const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing")
  const [userLogged, setUserLogged] = useState()

  useEffect(() => {
    checkAuthState()
  }, [])

  async function checkAuthState() {
    try {
      //get user from cognito
      const userInfo = await Auth.currentAuthenticatedUser()
      if (!userInfo) return
      const userId = userInfo.attributes.sub

      //check if user exists in db
      const user = (await DataStore.query(User)).filter((u) => u.sub === userId)

      if (!user) {
        //if not save user to db
        const newUser = await DataStore.save(
          new User({
            sub: userId,
            name: userInfo.attributes.email,
            image: defaultImage,
          })
        )
        setUserLogged(newUser)
      }

      setUserLogged(user)

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
        <AppNavigator
          updateAuthState={updateAuthState}
          userLogged={userLogged}
        />
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
