import React from "react"
import { StyleSheet } from "react-native"
import * as Yup from "yup"
import AppButton from "../components/AppButton"

import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import Screen from "../components/Screen"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Nom"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Mot de passe"),
})
const Register = ({ navigation }) => {
  return (
    <Screen>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(`values`, values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Nom"
        />
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
        <SubmitButton title="Inscription" />
        <AppButton
          title="Connexion"
          onPress={() => navigation.navigate("Login")}
        />
      </AppForm>
    </Screen>
  )
}

export default Register

const styles = StyleSheet.create({})
