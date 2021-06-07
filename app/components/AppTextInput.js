import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Dimensions,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import defaultStyles from "../config/styles"
export default function AppTextInput({
  icon,
  width = Dimensions.get("window").width - 16,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width: width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.black}
          style={styles.icon}
        />
      )}
      <TextInput style={[defaultStyles.text]} {...otherProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  textInput: {
    width: "100%",
    color: defaultStyles.colors.dark,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
})
