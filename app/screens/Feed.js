import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList } from "react-native"

import Card2 from "../components/Card2"
import Screen from "../components/Screen"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import ActivityIndicator from "../components/ActivityIndicator"
import { DataStore } from "aws-amplify"
import { Post } from "../../src/models"

const Feed = ({ navigation }) => {
  const post = [
    {
      id: "123",
      age: 24,
      name: "yes",
      images: [
        "https://pbs.twimg.com/media/E4es6RoWQAIffzY?format=jpg&name=small",
      ],
    },
  ]
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPosts()
    setLoading(false)
  }, [])

  const fetchPosts = async () => {
    const response = await DataStore.query(Post)
    setPosts(response)
  }
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      {error ? (
        <>
          <AppText style={{ textAlign: "center" }}>
            Erreur lors du chargement des posts
          </AppText>
          <AppButton title="Réessayer" onPress={request} />
        </>
      ) : (
        <FlatList
          refreshing={refresh}
          onRefresh={() => fetchPosts()}
          numColumns={2}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card2 item={item} />}
        />
      )}
    </Screen>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
