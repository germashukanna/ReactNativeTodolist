import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import {globalStyles} from "../globalStyles";


type iProps = {
  title: string
  changeTitle: (taskId: number, title: string) => void
  id: number
  setShow: (taskId: number) => void
}

export const Input = (props: iProps) => {
  const [value, setValue] = useState(props.title)
  const changeTitle = (title: string) => {
    setValue(title)
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        style={[styles.input, globalStyles.border]}
        value={value}
        onChangeText={(title) => changeTitle(title)}
      />
      <Button
        color={'#b8c1ec'}
        title={'+'}
        onPress={() => {
          props.changeTitle(props.id, value)
          props.setShow(0)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    backgroundColor: '#b8c1ec',
    fontSize: 18,
    padding: 4,
    color: 'black'
  }
})
