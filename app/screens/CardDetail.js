import React, { useState, useEffect, useContext } from "react"
import { Storage } from "aws-amplify"
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"
import ImageView from "react-native-image-view"
import moment from "moment"
import "moment/locale/fr"
moment.locale("fr")

import AppText from "../components/AppText"
import colors from "../config/colors"
import ProfileComponent from "../components/ProfileComponent"
import ActivityIndicator from "../components/ActivityIndicator"
import AppButton from "../components/AppButton"
import DetailsText from "../components/DetailsText"
import UserContext from "../hooks/UserContext"
import Separator from "../components/Separator"

const CardDetail = ({ route, navigation }) => {
  //state---------//
  const [post, setPost] = useState(route.params.item)
  //Main image
  const [image, setImage] = useState()
  //images for the carousel (all the array of images)
  const [carousel, setCarousel] = useState([])
  const [carouselVisible, setCarouselVisible] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(true)

  //
  const { user } = useContext(UserContext)

  const { name, age, date, location } = post
  const { corpulence, height, hair, eyes, outfit, other } = post
  const { tel, email } = post
  //fetch post with postId
  useEffect(() => {
    try {
      setLoading(true)
      setPost(post)
      setLoading(false)
      setError(false)
    } catch (e) {
      console.log(`e`, e)
      setError(true)
      setLoading(false)
    }
  }, [post])
  //Fetching the images and make them an url if their just a key
  useEffect(() => {
    const fetchImages = async () => {
      const imagesArray = []
      if (post) {
        for (let i = 0; i < post.images.length; i++)
          //the image is already an url
          if (post.images[i].startsWith("http")) {
            imagesArray.push(post.images[i])
          } else {
            //the image is a key, making it an url
            const img = await Storage.get(post.images[i])
            imagesArray.push(img)
          }
      }
      //the first image become the main image like the thumbnail on the feed
      setImage(imagesArray[0])
      return imagesArray
    }
    fetchImages().then((data) => imagesMap(data))
  }, [post])

  //save the post images into state and map them into a formatted array
  //to display the images in imageView(carousel)
  const imagesMap = (arr) => {
    arr = arr.map((uri, index) => ({ source: { uri }, id: index + 1 }))
    setCarousel(arr)
  }
  //Loading
  if (!post) return <ActivityIndicator visible={loading} />
  //Error
  if (error) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <AppText style2={{ textAlign: "center" }}>
          Erreur lors du chargement du post
        </AppText>
        <AppButton
          title="Réessayer"
          onPress={() => setPost(route.params.item)}
        />
      </View>
    )
  }

  //Success
  return (
    <View style={{ backgroundColor: "white" }}>
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
            setCarouselVisible(true)
          }}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
        <ImageView
          useNativeDriver={true}
          backgroundColor={"white"}
          animationType="slide"
          images={carousel}
          imageIndex={0}
          isVisible={carouselVisible}
          isPinchZoomEnabled={false}
          isTapZoomEnabled={false}
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
                {`${currentImage.id} / ${carousel.length}`}
              </AppText>
            </View>
          )}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "68%" }}
      >
        <AppText
          style2={{
            textAlign: "center",
            fontSize: 20,
            width: "90%",
            color: colors.danger,
          }}
        >
          {`Disparu le ${moment(date).format("LL")} à ${location}`}
        </AppText>
        <View style={{ padding: 20 }}>
          <AppText style={styles.sectionTitle}>Identité</AppText>
          <View style={styles.section}>
            <DetailsText text={name} subText={"Nom"} />
            <DetailsText text={age} subText={"Age"} other={" ans"} />
            <DetailsText text={location} subText={"Lieu de disparition"} />
          </View>
          <Separator />
          <AppText style={styles.sectionTitle}>Description physique</AppText>
          <View style={styles.section}>
            {corpulence && (
              <DetailsText text={corpulence} subText={"Corpulence"} />
            )}
            {height && (
              <DetailsText text={height} subText={"Taille"} other=" cm" />
            )}
            {hair && <DetailsText text={hair} subText={"Cheveux"} />}
            {eyes && <DetailsText text={eyes} subText={"Yeux"} />}
            {outfit && <DetailsText text={outfit} subText={"Tenue"} />}
            {other && <DetailsText text={other} subText={"Autre"} />}
          </View>
          <Separator />

          <AppText style={styles.sectionTitle}>Contact</AppText>
          <View style={styles.section}>
            <DetailsText text={tel} subText={"Téléphone"} />
            {email && <DetailsText text={email} subText={"Email"} />}
          </View>
        </View>
      </ScrollView>
      <View>
        {/*  <ProfileComponent
          image={user.image}
          title={user.name}
          subTitle={user.id}
          buttonTitle="Contacter"
          buttonAction={() => console.log(`test`)}
        />*/}
      </View>
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
    width: "100%",
    borderColor: "black",
  },
  title: {
    marginBottom: 7,
    color: colors.secondary,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "left",
  },
  section: {
    marginBottom: 24,
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
