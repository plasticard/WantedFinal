import React, { useState } from "react"
import { Formik, Form } from "formik"
import AppButton from "../AppButton"
import { View } from "react-native"
import { SubmitButton } from "."

function MultiForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  progress,
}) {
  const childrenArray = React.Children.toArray(children)
  const oneStep = 1 / childrenArray.length //percentage of one step progress in the form
  const [step, setstep] = useState(0)
  const currentChild = childrenArray[step]

  return (
    <View style={{ paddingBottom: 32 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            {currentChild}
            <View style={{}}>
              {step < childrenArray.length - 1 ? (
                <AppButton
                  style
                  onPress={() => {
                    setstep((s) => s + 1)
                    progress(oneStep)
                  }}
                  color="primary"
                  text="white"
                  title="Suivant"
                />
              ) : null}
              {step > 0 ? (
                <AppButton
                  onPress={() => {
                    setstep((s) => s - 1)
                    progress(-oneStep)
                  }}
                  title="Retour"
                />
              ) : null}
              {step === childrenArray.length - 1 ? (
                <SubmitButton
                  title="Valider"
                  onPress2={() => progress(oneStep)}
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
