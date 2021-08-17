import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import colors from "../../config/colors"
import Screen from "../../components/Screen"

export default SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } })

      console.log(" Sign-up Confirmed")

      navigation.navigate("ConfirmSignUp", { username })
    } catch (error) {
      console.log(" Error signing up...", error)
    }
  }

  return (
    <Screen style2={styles.container}>
      <Text style={styles.title}>Bienvenue sur Wanted</Text>
      <Text style={styles.subtitle}>S'inscrire</Text>

      <AppTextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        icon="account"
        placeholder="Email"
        icon="email"
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

      <AppButton title="Inscription" onPress={signUp} />

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.forgotPasswordButtonText}>
            Vous avez un compte ? Connectez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
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
