import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"

//data
import { API } from "aws-amplify"
import * as queries from "../../src/graphql/queries"

import AppButton from "../components/AppButton"
import Card2 from "../components/Card2"
import Screen from "../components/Screen"
import { FlatList } from "react-native-gesture-handler"

const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    const apiData = await API.graphql({ query: queries.listPosts })
    setPosts(apiData.data.listPosts.items)
  }

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FlatList
          numColumns={2}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card2 title={item.name} subTitle={item.age} image={item.images} />
          )}
        />
      </View>
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
