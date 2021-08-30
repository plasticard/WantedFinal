import React, { useContext, useState, useEffect } from "react"
import {
  FlatList,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native"

import Icon from "../components/Icon"
import ListItem from "../components/lists/ListItem"
import Screen from "../components/Screen"
import Separator from "../components/Separator"
import ProfileComponent from "../components/ProfileComponent"
import UpdateProfile from "./UpdateProfile"

import Auth from "@aws-amplify/auth"
import UserContext from "../hooks/UserContext"

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
const Account = ({ navigation, updateAuthState }) => {
  const { user, updateImage } = useContext(UserContext)
  const [modal, setModal] = useState(false)

  async function signOut() {
    try {
      await Auth.signOut()
      updateAuthState("loggedOut")
      console.log(`signOut2`)
    } catch (error) {
      console.log("Error signing out: ", error)
    }
  }

  return (
    <>
      <Screen style2={styles.screen}>
        <ProfileComponent
          image={user.image}
          title={user.name}
          subTitle={user.name}
          buttonTitle="Modifier"
          buttonAction={() => setModal(true)}
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
          onPress={signOut}
          title="Déconnexion"
          ImageComponent={<Icon backgroundColor="yellow" name="logout" />}
        />
      </Screen>
      <View style={styles.centeredView}>
        <UpdateProfile modal={modal} setModal={setModal} />
      </View>
    </>
  )
}
{
  /**
   *
   */
}

export default Account

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginBottom: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
})
