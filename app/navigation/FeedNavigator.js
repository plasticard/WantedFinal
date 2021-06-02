import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import CardDetailScreen from "../screens/CardDetailScreen"
import Feed from "../screens/Feed"
import Test from "../screens/Test"
import routes from "./routes"
import Test2 from "../screens/Test2"

const Stack = createStackNavigator()
export default function FeedNavigator() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
    >
      <Stack.Screen name={routes.FEED} component={Feed} />
      <Stack.Screen name={routes.CARD_DETAIL} component={CardDetailScreen} />
      <Stack.Screen name={"Test"} component={Test} />
      <Stack.Screen name={"Test2"} component={Test2} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
