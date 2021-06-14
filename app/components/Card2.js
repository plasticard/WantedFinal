import React from "react"
import { Image, StyleSheet, View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"
import colors from "../config/colors"
import AppText from "./AppText"
import routes from "../navigation/routes"
const Card = ({
  title = "Nom Prenom",
  subTitle = "23 ans",
  image = "https://www.topmercato.com/wp-content/uploads/2021/05/Lionel-Messi-Barca-Atletico-Madrid.jpg",
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(routes.CARD_DETAIL, {
          image:
            "https://assets-fr.imgfoot.com/media/cache/642x382/lionel-messi-barca-2021.jpg",
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
        <Image style={styles.image} source={{ uri: image }} />
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
          <AppText style2={styles.title}>{title}</AppText>
          <AppText style2={styles.title}>{subTitle}</AppText>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppText style2={styles.description}>9/18/16</AppText>
          <AppText style2={styles.description}>Paris</AppText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Card

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
