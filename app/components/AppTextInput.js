import React from "react"
import { StyleSheet, View, TextInput, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import defaultStyles from "../config/styles"
export default function AppTextInput({
  style2,
  icon,
  width = Dimensions.get("window").width - 32,
  ...otherProps
}) {
  return (
    <View style={[styles.container, style2, { width: width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.black}
          style={styles.icon}
        />
      )}
      <TextInput
        autoCorrect={false}
        style={[defaultStyles.text, styles.textInput, { width: width }]}
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
