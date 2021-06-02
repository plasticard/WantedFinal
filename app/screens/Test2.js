import React, { useState, useEffect } from "react"
import { StyleSheet, Button, View, Tesxt } from "react-native"

const Test2 = ({ route }) => {
  return (
    <View>
      <Text>{route.params}</Text>
    </View>
  )
}

export default Test2

const styles = StyleSheet.create({})
