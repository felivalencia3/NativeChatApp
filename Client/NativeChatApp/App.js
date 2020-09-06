import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ""};

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        const username = this.state.text;
        this.props.navigation.navigate("Chat", {
            user: username
        });
        event.preventDefault()
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center',justifyContent: "center", paddingLeft: 10, paddingTop: 10 }}>
                <Text>Enter your Username/Alias</Text>
                <TextInput style={{height:20, width: 100}} placeholder="Username..." onChangeText={(text) => this.setState({text})}/>
                <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

class ChatScreen extends React.Component {
    render() {
        const { navigation } = this.props,
            username = navigation.getParam("user", "Anonymous");
        return (
            <View style={{alignItems: 'center', justifyContent: 'center' }}>
                <Text>Chatroom Screen</Text>
                <Text>My Username is: {username}</Text>
                <Button
                    title="Go back"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Chat: ChatScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
