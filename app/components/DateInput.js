import React, { useState } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MaterialIcons } from "@expo/vector-icons"
import moment from "moment"
import "moment/locale/fr"
moment.locale("fr")

import AppText from "./AppText"
import colors from "../config/colors"

const DateInput = ({ placeholder, name }) => {
  const ios = Platform.OS == "ios" ? true : false
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(ios)
  const formattedDate = moment(date).format("LL")

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(ios)
    setDate(currentDate)
  }

  return (
    <View
      style={{
        backgroundColor: colors.light,
        padding: 15,
        justifyContent: "flex-start",
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
      }}
    >
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={colors.black}
            />
            <AppText
              style2={{ marginLeft: 8, color: "#979797", marginBottom: 8 }}
            >
              {placeholder}
            </AppText>
          </View>
          {ios ? null : <AppText>{formattedDate}</AppText>}
          {show && (
            <DateTimePicker
              maximumDate={new Date()}
              onChange={onChange}
              value={date}
              is24Hour={true}
              display="default"
              locale={"fr-FR"}
              textColor={colors.black}
              style={{
                width: "100%",
                height: 55,
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default DateInput

const styles = StyleSheet.create({})