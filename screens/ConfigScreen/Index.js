import { View, Text, StyleSheet } from "react-native";

function ConfigScreen() {
    return ( 
        <View style={styles.container}>
            <Text>Config Screen</Text>
        </View>  // or return your component here
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E213F',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ConfigScreen;