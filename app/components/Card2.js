import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"
import moment from "moment"
import "moment/locale/fr"
moment.locale("fr")

import colors from "../config/colors"
import AppText from "./AppText"
import routes from "../navigation/routes"

import { Storage } from "aws-amplify"
const Card2 = ({ item }) => {
  //state
  const navigation = useNavigation()
  const { id, name, age, images, location, createdAt } = item
  const [image, setImage] = useState()

  useEffect(() => {
    if (images) {
      if (images[0].startsWith("http")) setImage(images[0])
      else {
        Storage.get(images[0]).then(setImage)
      }
    }
  }, [item])
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(routes.CARD_DETAIL, {
          item: item,
        })
      }
    >
      <View
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        {image ? (
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        ) : null}
      </View>
      <View style={styles.details}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.title}>{name}</AppText>
          <AppText style2={styles.title}>{age}</AppText>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.description}>
            {moment(createdAt).startOf("day").fromNow()}
          </AppText>
          <AppText style2={styles.description}>DISPARITION</AppText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Card2

const styles = StyleSheet.create({
  card: {
    flexWrap: "nowrap",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 203,
    width: "45%",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  details: {
    padding: 3,
    flex: 1,
    height: 32,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },

  description: {
    fontSize: 12,
    fontWeight: "normal",
    color: colors.secondary,
  },
})
