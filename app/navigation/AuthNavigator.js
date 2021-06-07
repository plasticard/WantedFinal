import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import SignIn from "../screens/auth/SignIn"
import SignUp from "../screens/auth/SignUp"
import ConfirmSignUp from "../screens/auth/ConfirmSignUp"
const AuthStack = createStackNavigator()
export default AuthNavigator = (props) => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn">
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
    </AuthStack.Navigator>
  )
}
