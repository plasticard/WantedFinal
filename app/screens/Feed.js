import Auth from "@aws-amplify/auth"
import React from "react"

import { Button, Pressable, StyleSheet, Text, View } from "react-native"
import AppButton from "../components/AppButton"
import Card2 from "../components/Card2"
import Screen from "../components/Screen"

const Feed = ({ navigation, updateAuthState }) => {
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
        <Button
          onPress={() => signOut()}
          style={{ width: 100, height: 50, backgroundColor: "red" }}
          title="logout"
        />
        <AppButton title="test" onPress={() => navigation.navigate("Test")} />
      </View>
    </Screen>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
