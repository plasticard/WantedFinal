import React, { useState } from "react"
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"

import ActivityIndicator from "../../components/ActivityIndicator"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../config/colors"
import Screen from "../../components/Screen"
const SignIn = ({ navigation, updateAuthState }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function signIn() {
    try {
      setLoading(true)
      await Auth.signIn(username, password)

      console.log(" Success")

      updateAuthState("loggedIn")
      setLoading(false)
    } catch (error) {
      console.log(" Error signing in...", error)
    }
  }

  return (
    <Screen style2={styles.container}>
      <ActivityIndicator visible={loading} />
      <Text style={styles.title}>Bienvenue sur Wanted</Text>
      <Text style={styles.subtitle}>Se connecter</Text>

      <AppTextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        icon="email"
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
      />

      <AppTextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        icon="lock"
        placeholder="Mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        textContentType="password"
      />

      <AppButton title="Connexion" onPress={signIn} />

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.forgotPasswordButtonText}>
            Pas de compte ? Inscrivez-vous
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordButtonText}>
            Mot de passe oublié
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="testFB"
        onPress={() => Auth.federatedSignIn({ provider: "Facebook" })}
        iconRight
      />
      <Button
        title="testGo"
        onPress={() => Auth.federatedSignIn({ provider: "Google" })}
        iconRight
      />
    </Screen>
  )
}
export default SignIn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },

  title: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: "500",
    marginVertical: 24,
  },
  subtitle: {
    alignSelf: "flex-start",
    marginLeft: 16,
    fontSize: 24,
    color: colors.black,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 24,
  },

  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  forgotPasswordButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
})
