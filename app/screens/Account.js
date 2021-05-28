import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import Icon from "../components/Icon"
import ListItem from "../components/lists/ListItem"
import Screen from "../components/Screen"
import Separator from "../components/Separator"

const menuItems = [
  {
    title: "Mes Posts",
    icon: {
      name: "format-list-bulleted",
      iconColor: "white",
      backgroundColor: "blue",
    },
  },
  {
    title: "Mes Messages",
    icon: {
      name: "email",
      iconColor: "white",
      backgroundColor: "red",
    },
    navigate: "Messages",
  },
]
const Account = ({ navigation }) => {
  return (
    <Screen style2={styles.screen}>
      <ListItem
        image={require("../assets/pp.png")}
        title="Nom Prenom"
        subTitle="adress@mail.com"
      />
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.navigate)}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  iconColor={item.icon.iconColor}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title="Déconnexion"
        ImageComponent={<Icon backgroundColor="yellow" name="logout" />}
      />
    </Screen>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginBottom: 40,
  },
})
