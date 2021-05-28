import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../config/colors"
import NewPostButton from "./NewPostButton"
import PostEdit from "../screens/PostEdit"
import FeedNavigator from "./FeedNavigator"
import AccountNavigator from "./AccountNavigator"

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: colors.white,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.medium,
      showLabel: false,
    }}
  >
    <Tab.Screen
      name={"FeedNavigator"}
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={"PostEdit"}
      component={PostEdit}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewPostButton onPress={() => navigation.navigate("PostEdit")} />
        ),
      })}
    />
    <Tab.Screen
      name="AccountNavigator"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator
