import React, { useState } from "react"
import { Formik, Form } from "formik"
import AppButton from "../AppButton"
import { Button, View } from "react-native"
import  SubmitButton  from "./SubmitButton"

function MultiForm({
  initialValues,
  onSubmit,
  updatePost,
  validationSchema,
  children,
  progress,
}) {
  const childrenArray = React.Children.toArray(children)
  const oneStep = 1 / childrenArray.length //part of one step progress in the form
  const [step, setstep] = useState(0)
  const currentChild = childrenArray[step]
  return (
    <View style={{ paddingBottom: 32 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            {currentChild}
            <View>
              {step === childrenArray.length - 1 ? (
                <SubmitButton title="valider" onPress={() => onSubmit()} />
              ) : null}
              {step < childrenArray.length - 1 ? (
                <AppButton
                  title="Suivant"
                  onPress={() => {
                    setstep((s) => s + 1)
                    progress(oneStep)
                  }}
                />
              ) : null}
              {step > 0 ? (
                <AppButton
                  color="white"
                  text="primary"
                  onPress={() => {
                    setstep((s) => s - 1)
                    progress(-oneStep)
                  }}
                  title="Retour"
                />
              ) : null}
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default MultiForm
