import React, { useState, useRef } from "react"
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import * as Yup from "yup"
import ProgressBar from "react-native-progress/Bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { DataStore } from "aws-amplify"
import { Post } from "../../src/models"

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
  //progress bar and states gestion
  const [state, setstate] = useState(0)
  const changeProgress = (i) => {
    setstate(state + i)
  }
  //post data
  const handleSubmit = async (post) => {
    console.log(`postEdit`, post)

    //parsing age to number to fit in the DB model
    // console.log(`post.age`, typeof post.age)
    //post.age = parseInt(post.age)
    await DataStore.save(new Post(post))
    navigation.navigate("FeedNavigator")
    setstate(0)
  }
  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            marginRight: 16,
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
          progress={state}
          color={colors.secondary}
          unfilledColor={colors.light}
          borderColor={colors.background}
          height={8}
          borderRadius={0}
          useNativeDriver={true}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToStart()}
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
              eye: "",
              outfit: "",
              other: "",
              email: "",
              tel: "",
            }}
            onSubmit={(values) => {
              handleSubmit(handleSubmit)
              console.log("values", values)
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
                placeholder="Nom, prénom, surnom..."
                icon="account"
              />
              <AppFormField
                name="age"
                keyboardType="numeric"
                maxLength={3}
                placeholder="Age"
                style2={{ align: "flex-start", width: "22%", marginLeft: 16 }}
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
                style2={{ width: "30%" }}
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
              <AppFormField
                name="tel"
                placeholder="Téléphone"
                keyboardType="numeric"
                maxLength={10}
              />
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
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
})
