import {StatusBar} from 'expo-status-bar';
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity, FlatList, ListRenderItem,
    Dimensions
} from 'react-native';
import {useState} from "react";

const {width, height} = Dimensions.get('screen')

const WIDTH = width
const HEIGHT = height

type ItemType = {
    id: number
    title: string
    price: number
}

const titles = ['one', 'two', 'tree', 'five', 'six']
const prices = [1, 2, 3, 4, 6]

//const data1 = [... Array(30).map((_, index) => ({}))] первый вариант быстрого создания пустого массива
// const data = new Array(30).fill(null).map((_, index) => ({})) второй вариант быстрого создания пустого массива

const data: ItemType[] = [...Array(30)].map((_, index) => ({
    id: index + 1,
    title: titles[index % titles.length],
    price: prices[index % prices.length],
}))

export default function App() {
    //console.log('data', JSON.stringify(data, null, 2))
    const [value, setValue] = useState('')
    const render: ListRenderItem<ItemType> = ({item, index, separators}) => {
        return <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.price}</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <FlatList
                ListEmptyComponent={() => {
                    return <View><Text>Пустой массив</Text></View>
                }}
                ListHeaderComponent={() => {
                    return <View><Text>Хедер</Text></View>
                }}
                ListFooterComponent={() => {
                    return <View><Text>Футер</Text></View>
                }}

                data={data}
                renderItem={render}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                // keyExtractor={item => item.id}
            />
            {/*<ActivityIndicator/>*/}
            {/*<ActivityIndicator size="large"/>*/}
            {/*<ActivityIndicator size="small" color="#0000ff"/>*/}
            {/*<ActivityIndicator size="large" color="#00ff00"/>*/}
            {/*<Button*/}
            {/*    title="Press me"*/}
            {/*    onPress={() => Alert.alert('Simple Button pressed')}*/}
            {/*/>*/}
            {/*<Image*/}
            {/*    style={{width: 100, height: 100, marginTop: 15}}*/}
            {/*    source={{*/}
            {/*        uri: 'https://reactnative.dev/img/tiny_logo.png', // более предпочтительнее*/}
            {/*        //source={require('@expo/snack-static/react-native-logo.png')} => если файл лежит в папке*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    onChangeText={setValue}*/}
            {/*    value={value}*/}
            {/*/>*/}
            {/*<TouchableOpacity*/}
            {/*   style={styles.button}*/}
            {/*    onPress={() => {}}>*/}
            {/*    <Text>Press Here</Text>*/}
            {/*</TouchableOpacity>*/}
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        width: 200,
        height: 32,
    },
    button: {
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    item: {
        marginVertical: 5,
        backgroundColor: '#a199e1',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: (WIDTH - 20 * 2) / 2 - 5,
        //height: (HEIGHT - 20 * 2) / 2 - 5,
        position: "relative"
    },
    title: {
        position: "absolute",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#eadb7a',
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 14,
        top: -15,
        left: 15
    }
});
