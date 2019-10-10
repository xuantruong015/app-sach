import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { DangNhapService } from './Api';

export default class DangNhap extends React.Component {

    static navigationOptions = {
        title: "Dang nhap",
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            email: '',
            pwd: ''
        }
    }

    DangNhap() {
        if (this.state.email == "" && this.state.pwd == "") {
            Alert.alert("Vui long nhap tai khoan/mat khau");
        } else {
            fetch(DangNhapService, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    pw: this.state.pwd,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.status == 1) {
                        this.props.navigation.navigate('tc');
                    }
                    else Alert.alert("Sai tai khoan hoac mat khau");
                }).catch(function (err) {
                    console.log(err);
                }).done();
        }
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    onChangeText={email => this.setState({ email })} />
                <TextInput
                    placeholder="Mat khau"
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={pwd => this.setState({ pwd })} />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacityStyle}
                    onPress={this.DangNhap.bind(this)}>
                    <Text style={styles.TextStyle}>Dang nhap</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20

        },

        ImageLogoStyleClass:
        {
            width: 150,
            height: 200,
            margin: 20
        },

        TextInputStyleClass:
        {
            textAlign: 'center',
            height: 40,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: '#32a852',
            borderRadius: 7,
            marginBottom: 10,
            width: '95%'
        },

        TouchableOpacityStyle:
        {
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 20,
            borderRadius: 7,
            backgroundColor: '#32a852',
            width: '95%'

        },

        TextStyle:
        {
            color: '#fff',
            textAlign: 'center',
            fontSize: 18
        },

        ActivityIndicatorStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'

        }
    });