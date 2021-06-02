import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import AppButton from "../components/AppButton"
import Card2 from "../components/Card2"
import LocalisationSearchBar from "../components/forms/LocalisationSearchBar"
import Screen from "../components/Screen"

const Feed = ({ navigation }) => {
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
