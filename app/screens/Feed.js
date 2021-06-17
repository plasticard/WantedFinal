import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList } from "react-native"

import Card2 from "../components/Card2"
import Screen from "../components/Screen"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import ActivityIndicator from "../components/ActivityIndicator"
import useApi from "../hooks/useApi"

const Feed = ({ navigation }) => {
  const { data, error, loading, fetchListPosts: request } = useApi()

  useEffect(() => {
    request()
  }, [])
  /* async function request() {
    setLoading(true)
    try {
      const apiData = await API.graphql({ query: queries.listPosts })
      setData(apiData.data.listPosts.items)
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }*/

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
          scrol
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card2 title={item.name} subTitle={item.age} image={item.images} />
          )}
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
