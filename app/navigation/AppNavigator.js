import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../config/colors"
import NewPostButton from "./NewPostButton"
import PostEdit from "../screens/PostEdit"
import FeedNavigator from "./FeedNavigator"
import AccountNavigator from "./AccountNavigator"
import Test from "../screens/Test2"
import Icon from "../components/Icon"

const Tab = createBottomTabNavigator()

const AppNavigator = ({ updateAuthState }) => (
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
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),

        headerShown: true,
        // title: 'My home',
        headerRight: () => (
          <View>
            <Button onPress={() => Auth.signOut({ global: true })} transparent>
              <Icon name="exit-to-app" style={{ iconColor: "white" }} />
            </Button>
          </View>
        ),
      }}
    >
      {(screenProps) => (
        <AccountNavigator {...screenProps} updateAuthState={updateAuthState} />
      )}
    </Tab.Screen>
  </Tab.Navigator>
)

export default AppNavigator
