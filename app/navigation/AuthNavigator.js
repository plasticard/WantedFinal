import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import CardDetailScreen from "../screens/CardDetailScreen"
import Feed from "../screens/Feed"
import Login from "../screens/Login"
import Register from "../screens/Register"

const Stack = createStackNavigator()
export default function AuthNavigator() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Feed} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
