import React, { useState, useEffect } from "react"
import { DataStore, strike } from "aws-amplify"
import { Post } from "../../src/models"
import {
  Image,
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"
import ImageView from "react-native-image-view"

import AppText from "../components/AppText"
import test from "../data/test"
import colors from "../config/colors"
import ProfileComponent from "../components/ProfileComponent"
import ActivityIndicator from "../components/ActivityIndicator"
import AppButton from "../components/AppButton"

const CardDetail = ({ route, navigation }) => {
  const [post, setPost] = useState()
  const [images, setImages] = useState([])
  //carousel of images
  const [carouselVisible, setCarouselVisible] = useState(false)

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

  //save the post images into state and map them into a formatted array
  //to display the images in imageView(carousel)
  const imagesMap = (arr) => {
    arr = arr.map((uri, index) => ({ source: { uri }, id: index + 1 }))
    setImages(arr)
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
          //icon images
          <View style2={styles.header}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.light,
                borderRadius: 45,
                bottom: 35,
                flexDirection: "row",
                padding: 8,
                position: "absolute",
                right: 20,
                zIndex: 100,
              }}
            >
              <AppText
                style={{ marginRight: 8, fontSize: 18, color: colors.medium }}
              >
                {post.images.length}
              </AppText>
              <FontAwesome5 name="images" size={18} color={colors.medium} />
            </View>
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
            <TouchableOpacity
              onPress={() => {
                imagesMap(post.images)
                setCarouselVisible(true)
              }}
            >
              <Image source={{ uri: post.images[0] }} style={styles.image} />
            </TouchableOpacity>
            <ImageView
              useNativeDriver={true}
              backgroundColor={"white"}
              animationType="slide"
              images={images}
              imageIndex={0}
              isVisible={carouselVisible}
              isPinchZoomEnabled={false}
              isSwipeCloseEnabled={false}
              onClose={() => setCarouselVisible(false)}
              renderFooter={(currentImage) => (
                <View
                  style={{
                    alignSelf: "center",
                    bottom: 50,
                    backgroundColor: colors.light,
                    borderRadius: 45,
                    width: 60,
                    padding: 8,
                  }}
                >
                  <AppText
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    {`${currentImage.id} / ${images.length}`}
                  </AppText>
                </View>
              )}
            />
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
              image={post.User?.image}
              title={post.User?.name}
              subTitle={post.User?.id}
              buttonTitle="Contacter"
              buttonAction={() => console.log(`test`)}
            />
          </>
        }
        showsVerticalScrollIndicator={false}
        sections={post.post}
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
