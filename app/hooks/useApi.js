import React, { useState } from "react"
//data
import { API } from "aws-amplify"
import * as queries from "../../src/graphql/queries"
import * as mutations from "../../src/graphql/mutations"

export default useApi = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  //get list of posts
  async function fetchListPosts() {
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
  }

  //submitPost
  const submitPost = async (listing) => {
    console.log(listing)
    try {
      const newPost = await API.graphql({
        query: mutations.createPost,
        variables: {
          input: listing,
        },
      })
      alert("Succès")
    } catch (e) {
      console.log(e)
    }
  }

  return { data, error, loading, fetchListPosts, submitPost }
}
