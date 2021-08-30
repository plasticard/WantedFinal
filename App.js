import React, { useState, useEffect } from "react"
import { StyleSheet, View, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import navigationTheme from "./app/navigation/navigationTheme"
import { LogBox } from "react-native"

LogBox.ignoreLogs(["Setting a timer"])

import UserContext from "./app/hooks/UserContext"
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

      if (user.length === 0) {
        //if not save user to db
        const newUser = await DataStore.save(
          new User({
            sub: userId,
            email: userInfo.attributes.email,
            name: userInfo.attributes.email.split("@")[0],
            image: defaultImage,
          })
        )
        console.log(`newUser`, newUser)

        setUserLogged(newUser)
      }

      setUserLogged(user[0])

      console.log(" User is signed in")
      setUserLoggedIn("loggedIn")
    } catch (err) {
      console.log(" User is not signed in")
      setUserLoggedIn("loggedOut")
    }
  }
  //update the user auth state
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn)
  }

  //change the user profile image
  updateImage = async (img) => {
    await DataStore.save(
      Post.copyOf(userLogged, (updated) => {
        updated.image = img
      })
    )
  }
  //value for userContext provider
  const contextValue = {
    user: userLogged,
    updateImage,
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === "initializing" && <Initializing />}
      {isUserLoggedIn === "loggedIn" && (
        <UserContext.Provider value={contextValue}>
          <AppNavigator updateAuthState={updateAuthState} />
        </UserContext.Provider>
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
