import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { MaterialIcons } from "@expo/vector-icons"
import { useFormikContext } from "formik"

import defaultStyles from "../../config/styles"
import ErrorMessage from "./ErrorMessage"

import { LogBox } from "react-native"

const LocalisationSearchBar = ({ placeholder, name }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  const [state, setstate] = useState()

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={"my-location"}
        size={20}
        color={defaultStyles.colors.black}
        style={styles.icon}
      />
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        disableScroll
        placeholder={placeholder}
        onPress={(data, details = null) => {
          handleChange(name)
        }}
        query={{
          key: "AIzaSyCeoQjaosVPYf8xS0QxiqIOL_od4exQf8s",
          language: "fr",
          types: "(cities)",
        }}
        styles={{
          textInput: styles.textInput,
          row: styles.row,
          poweredContainer: styles.row,
        }}
        keyboardShouldPersistTaps="handled"
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default LocalisationSearchBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    color: defaultStyles.colors.dark,
    backgroundColor: defaultStyles.colors.light,
  },
  row: { backgroundColor: defaultStyles.colors.light },
})
