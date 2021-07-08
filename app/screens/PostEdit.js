import React, { useState, useRef } from "react"
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import * as Yup from "yup"
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { DataStore, Storage, Auth } from "aws-amplify"
import { Post, User } from "../../src/models"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import AppText from "../components/AppText"
import { AppFormField } from "../components/forms"
import MultiForm from "../components/forms/MultiForm"
import Screen from "../components/Screen"
import colors from "../config/colors"
import DateInput from "../components/DateInput"
import ImagePicker from "../components/forms/ImagePicker"
import LocalisationSearchBar from "../components/forms/LocalisationSearchBar"

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Sélectionner au moins 1 image"),
  name: Yup.string().min(3, "Entrer un nom").label("Nom"),
  age: Yup.number().min(0).max(120).label("Age"),
  date: Yup.date().label("Date"),
  location: Yup.string().min(4).label("Localisation"),

  corpulence: Yup.string().label("Corpulence"),
  height: Yup.number().min(100).max(220).label("Taille"),
  hair: Yup.string().label("Cheveux"),
  eyes: Yup.string().label("Yeux"),
  outfit: Yup.string().label("Tenue"),
  other: Yup.string().label("Autre"),

  tel: Yup.string().label("Téléphone"),
  email: Yup.string().label("Email"),
})
const PostEdit = ({ navigation }) => {
  const scrollView = useRef()

  //progress bar and steps gestion
  const [step, setStep] = useState(0)
  const changeProgress = (i) => {
    setStep(step + i)
  }

  //post data
  const handleSubmit = async (post) => {
    if (!post) return
    const userInfo = await Auth.currentAuthenticatedUser()
    const userSub = userInfo.attributes.sub
    const user = (await DataStore.query(User)).find((u) => u.sub === userSub)
    if (!user) {
      console.error("User not found")
      return
    }
    //parse age to number to fit in the DB model
    post.age = parseInt(post.age)
    post.height = parseInt(post.height)

    //save every images of the post in Storage and return a key for each
    var imageKeys = []
    const max = post.images.length
    for (let i = 0; i < max; i++) {
      const formattedImg = await uploadImage(post.images[i])
      imageKeys.push(formattedImg)
    }
    ///////

    //save the post with all formatted fields
    await DataStore.save(
      new Post({
        images: imageKeys,
        name: post.name,
        age: post.age,
        date: "2020-03-12T13:00:00.000Z",
        location: post.location,
        corpulence: post.corpulence,
        height: post.height,
        hair: post.hair,
        eyes: post.eyes,
        outfit: post.outfit,
        other: post.other,
        tel: `+33${post.tel}`,
        email: post.email,
        userID: user.id,
      })
    )
    navigation.navigate("FeedNavigator")
    setStep(0)
    //resetForm()
  }
  //upload images in Storage
  const uploadImage = async (image) => {
    if (!image) return
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const fileKey = `${uuidv4()}.png`
      await Storage.put(fileKey, blob)

      return fileKey
    } catch (err) {
      console.log("(PostEdit.uploadImage)Error uploading file:", err)
      return null
    }
  }
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            marginLeft: 16,
            marginVertical: 8,
          }}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color={colors.medium}
          />
        </TouchableOpacity>
        <ProgressBar
          animated={true}
          animationType="spring"
          width={Dimensions.get("window").width}
          progress={step}
          color={colors.secondary}
          unfilledColor={colors.light}
          borderColor={colors.background}
          height={8}
          borderRadius={0}
          useNativeDriver={true}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          <MultiForm
            validationSchema={validationSchema}
            progress={changeProgress}
            initialValues={{
              images: [],
              name: "",
              age: "",
              date: "",
              location: "",
              corpulence: "",
              height: "",
              hair: "",
              eyes: "",
              outfit: "",
              other: "",
              email: "",
              tel: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {
              //Form 1
            }
            <View>
              <AppText style2={styles.title}>Identité et Signalement</AppText>
              <ImagePicker name="images" />

              <AppFormField
                name="name"
                placeholder="Nom, prénom..."
                icon="account"
              />
              <AppFormField
                name="age"
                keyboardType="numeric"
                maxLength={3}
                placeholder="Age"
                width={"22%"}
              />
              <DateInput
                name="date"
                placeholder="Date de disparition"
                icon="calendar-today"
              />
              <LocalisationSearchBar
                placeholder="Dernière localisation"
                name="location"
              />
            </View>
            {
              //Form 2
            }
            <View>
              <AppText style2={styles.title}>Description physique</AppText>
              <AppFormField
                name="corpulence"
                placeholder="Corpulence"
                style2={{ width: "75%" }}
              />
              <AppFormField
                name="height"
                keyboardType="numeric"
                maxLength={3}
                placeholder="Taille (cm)"
                width={"30%"}
              />

              <AppFormField name="hair" placeholder="Cheveux" />
              <AppFormField name="eyes" placeholder="Yeux" />
              <AppFormField
                name="outfit"
                placeholder="Tenue vestimentaire"
                multiline
                numberOfLines={4}
              />
              <AppFormField
                name="other"
                placeholder="Signe particulier, autre..."
                multiline
                numberOfLines={4}
              />
            </View>
            {
              //Form 3
            }
            <View>
              <AppText style2={styles.title}>Contact</AppText>
              <View
                style={{
                  marginHorizontal: 16,
                  paddingLeft: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.light,
                  borderRadius: 10,
                }}
              >
                <AppText>+33</AppText>
                <AppFormField
                  width={"40%"}
                  name="tel"
                  placeholder="Téléphone"
                  keyboardType="numeric"
                  maxLength={9}
                />
              </View>
              <AppFormField name="email" placeholder="Email" />
            </View>
          </MultiForm>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}

export default PostEdit

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
})
