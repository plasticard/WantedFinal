import React, { useState } from "react"
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"

import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../config/colors"

const SignIn = ({ navigation, updateAuthState }) => {
  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")

  async function signIn() {
    try {
      await Auth.signIn(username, password)

      console.log(" Success")

      updateAuthState("loggedIn")
    } catch (error) {
      console.log(" Error signing in...", error)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur Wanted</Text>
        <Text style={styles.subtitle}>Se connecter</Text>

        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          icon="account"
          placeholder="Nom d'utilisateur"
          autoCapitalize="none"
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
      </View>
    </SafeAreaView>
  )
}
export default SignIn
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    alignItems: "center",
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
