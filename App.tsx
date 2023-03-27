import {StatusBar} from 'expo-status-bar';
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Animated,
    LayoutAnimation, LayoutAnimationConfig
} from 'react-native';
import {useCallback, useEffect, useRef, useState} from "react";
import {Svg1} from "./assets/SVG/Svg1";


type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const titles = ['HTML', 'Css', 'React', 'React-native', 'Angular', 'NextJs']
const data: TaskType[] = [...Array(30)].map((_, index) => ({
    id: index + 1,
    title: titles[index % titles.length],
    isDone: !!(index % 2),
}))

export default function App() {

    const [tasks, setTasks] = useState<TaskType[]>(() => data)

    const [value, setValue] = useState('')

    const addTask = () => {
        const newTask: TaskType = {
            id: new Date().getTime(),
            title: value,
            isDone: false
        }
        setTasks([newTask, ...tasks])
        setValue('')
    }

    const updateTask = (id: number) => {
        setTasks(tasks.map((el) => el.id === id ? {...el, isDone: !el.isDone} : el))
    }

    const removeTask = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    const render: ListRenderItem<TaskType> = useCallback(({item, index}) => {
        return <Item {...item} index={index} removeTask={removeTask} updateTask={updateTask}/>
    }, [addTask, removeTask, updateTask])

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={addTask}>
                    <Text>ADD</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={tasks} renderItem={render}/>
            <StatusBar style="auto"/>
        </View>
    );
}

type ItemType = TaskType & {
    index: number,
    removeTask: (id: number) => void,
    updateTask: (id: number) => void
}

const layoutAnimConfig: LayoutAnimationConfig = {
    duration: 300,
    create: {
        duration: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        duration: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleX,
        springDamping: 0.6
    },
    delete: {
        duration: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    }
}

export const Item = ({id, title, isDone, index, removeTask, updateTask}: ItemType) => {
    const animatedValue = useRef(new Animated.Value(0)).current
    const animatedValue2 = useRef(new Animated.Value(isDone ? -100 : 0)).current
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true
        }).start()
    }, [])
    useEffect(() => {
        Animated.timing(animatedValue2, {
            toValue: isDone ? -100 : 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true
        }).start()
    }, [isDone])
    return (
        <Animated.View style={{opacity: animatedValue, transform: [{translateX: animatedValue2}]}}>
            <TouchableOpacity
                style={[styles.item, {backgroundColor: isDone ? '#ade17c' : '#b06289'}]}
                onPress={() => {
                    updateTask(id)
                    LayoutAnimation.configureNext(layoutAnimConfig)
                }
                }
            >
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={() => {
                    removeTask(id)
                    LayoutAnimation.configureNext(layoutAnimConfig) //анимация на удаление таски
                }}>
                    <Text>X</Text>
                    <Svg1/>
                </TouchableOpacity>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    item: {
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        flexGrow: 1,
        marginRight: 30,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 8,
    },
    buttonAdd: {
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
    },

});
