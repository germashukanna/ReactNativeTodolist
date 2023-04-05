import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {ReactElement, ReactNode, useState} from "react";
import {Input} from "./input/input";
import Checkbox from 'expo-checkbox';


export default function App() {

    const [value, setValue] = useState('')
    const [show, setShow] = useState(0)
    const [newTitle, setNewTitle] = useState('')

    const [tasks, setTasks] = useState([
        { id: 1, title: 'HTML', isDone: true },
        { id: 2, title: 'CSS', isDone: true },
        { id: 3, title: 'JS', isDone: false },
        { id: 4, title: 'React', isDone: false },
        { id: 5, title: 'React native', isDone: false }
    ])

    const changeStatus = (taskId: number, status: boolean) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone: status } : task)))
    }

    const addTask = () => {
        const newTask = {
            id: Math.round(Date.now() + Math.random() * 2),
            title: value,
            isDone: false
        }
        setTasks([newTask, ...tasks])
        setValue('')
    }

    const changeTitle = (taskId: number, title: string) => {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, title } : t)))
    }

    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={[{ width: '80%', alignItems: 'center', paddingVertical: 100 }]}>
                    <TextInput style={[styles.input]} value={value} onChangeText={setValue} />
                </View>
            </HideKeyboard>
            <Button color={'#b8c1ec'} title={'Add task'} onPress={addTask} />
            <View style={{ width: '60%' }}>
                {tasks.map((task) => {
                    return (
                        <View key={task.id} style={[styles.boxTask]}>
                            <Checkbox
                                value={task.isDone}
                                onValueChange={(value) => changeStatus(task.id, value)}
                            />
                            {show === task.id ? (
                                <Input
                                    id={task.id}
                                    title={task.title}
                                    changeTitle={changeTitle}
                                    setShow={setShow}
                                />
                            ) : (
                                <Text onPress={() => setShow(task.id)}>{task.title}</Text>
                            )}
                        </View>
                    )
                })}
            </View>
        </View>
    );
}

//убираем фокус с импута
const HideKeyboard = ({ children }: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232946',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        backgroundColor: '#b8c1ec',
        fontSize: 18,
        padding: 4,
        color: 'black'
    },
    boxTask: {
        flexDirection: 'row',
        backgroundColor: '#eebbc3',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 28,
        marginVertical: 3
    }
})
