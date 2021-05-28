import React from "react"
import { Image, StyleSheet } from "react-native"
import * as Yup from "yup"

import Screen from "../components/Screen"
import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import AppButton from "../components/AppButton"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Mot de passe"),
})
const Login = ({ navigation }) => {
  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/pp.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Mot de passe"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Connexion" />
        <AppButton
          title="Inscription"
          onPress={() => navigation.navigate("Register")}
        />
      </AppForm>
    </Screen>
  )
}

export default Login

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 50,
  },
})
