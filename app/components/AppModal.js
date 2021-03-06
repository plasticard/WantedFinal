import React, { useState } from "react"
import {
  StyleSheet,
  Modal,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../config/colors"
import Icon from "./Icon"
const AppModal = ({ modalVisible, setModalVisible, action }) => {
  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "email",
      label: "email",
      text: "Email",
      value: 1,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "phone",
      label: "tel",
      text: "Téléphone",
      value: 2,
    },
  ]
  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false)
            }}
            style={{
              alignSelf: "flex-end",
              marginRight: 16,
              marginVertical: 8,
            }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              justifyContent: "space-around",
            }}
            horizontal
            data={categories}
            keyExtractor={(item) => item.label.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => action(item.label)}>
                <Icon
                  size={80}
                  name={item.icon}
                  iconColor={colors.secondary}
                  backgroundColor={"white"}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  )
}

export default AppModal

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    flexDirection: "column",
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
})
