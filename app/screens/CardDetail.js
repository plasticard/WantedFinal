import React, { useState, useEffect } from "react"
import { DataStore } from "aws-amplify"
import { Post } from "../../src/models"
import {
  Image,
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Screen from "../components/Screen"

import AppText from "../components/AppText"
import test from "../data/test"
import colors from "../config/colors"
import ProfileComponent from "../components/ProfileComponent"
import ActivityIndicator from "../components/ActivityIndicator"
import AppButton from "../components/AppButton"

const CardDetail = ({ route, navigation }) => {
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const postId = route.params.id

  useEffect(() => {
    try {
      setLoading(true)

      fetchPost()
      setLoading(false)
    } catch (e) {
      console.log(`e`, e)
      setError(true)
      setLoading(false)
    }
  }, [postId])
  const fetchPost = async () => {
    const response = await DataStore.query(Post, postId).then(setPost)
  }
  //Loading
  if (!post) return <ActivityIndicator visible={loading} />
  //Error
  if (error) {
    return (
      <>
        <AppText style={{ textAlign: "center" }}>
          Erreur lors du chargement du post
        </AppText>
        <AppButton title="Réessayer" onPress={fetchPost} />
      </>
    )
  }
  //Success
  return (
    <View>
      <SectionList
        style={{ backgroundColor: "white" }}
        ListHeaderComponent={
          <View style2={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                zIndex: 100,
                borderRadius: 12,
                left: 10,
                top: 25,
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left-circle"
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
            <Image source={{ uri: post.images[0] }} style={styles.image} />
            <AppText
              style2={{
                textAlign: "center",
                fontSize: 20,
                width: "100%",
                color: colors.danger,
              }}
            >
              Disparu à Paris le 14/03/2020
            </AppText>
          </View>
        }
        ListFooterComponent={
          <>
            <ProfileComponent
              image={require("../assets/pp.png")}
              title="Username"
              subTitle="5 posts"
            />
          </>
        }
        showsVerticalScrollIndicator={false}
        sections={test}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <AppText style2={styles.subTitle}>{item}</AppText>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <AppText style2={styles.title}>{title}</AppText>
          </View>
        )}
      />
    </View>
  )
}

export default CardDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  header: {
    borderRightColor: colors.white,
    width: "100%",
  },
  title: {
    marginBottom: 7,
    color: colors.secondary,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 8,
  },
  subTitle: {
    fontSize: 15,
    color: colors.black,
    fontWeight: "normal",
    textAlign: "left",
    marginLeft: 16,
  },
})
