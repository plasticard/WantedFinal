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
  style2,
  icon,
  width = Dimensions.get("window").width - 32,
  ...otherProps
}) {
  return (
    <View style={[styles.container, style2]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.black}
          style={styles.icon}
        />
      )}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[defaultStyles.text, styles.textInput]}
        {...otherProps}
      />
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
    marginHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
})
