import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableHighlight, FlatList } from 'react-native';
import { GetTruyenTheoIdTheLoaiService } from './Api'

export default class DanhSachTruyen extends React.Component {
    static navigationOptions = {
        title: 'Danh sach truyen',
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        fetch(GetTruyenTheoIdTheLoaiService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_the_loai: this.props.navigation.getParam('truyen')
            })
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    isLoading: false,
                    dataContent: responseData.content
                }, function () {

                });
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.Container}>
                <View style={styles.MainContainer}>
                    <FlatList
                        data={this.state.dataContent}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomFlatListItem
                                    navigation={this.props.navigation}
                                    item={item}
                                    index={index}>
                                </CustomFlatListItem>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
};

class CustomFlatListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => { this.props.navigation.navigate('ctt', { chitiet: this.props.item }) }}>
                <View style={styles.FlatListItemClass}>
                    <View>
                        <Text style={{ fontSize: 20 }}>{this.props.item.ten_truyen}</Text>
                        <Text style={{ fontSize: 16 }}>{this.props.item.tom_tat}</Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

const styles = StyleSheet.create(
    {
        Container: {
            flex: 1
        },

        HeaderContainer: {
            marginTop: 20,
            flex: .5,
            justifyContent: 'center',
            alignItems: 'center',
        },

        InfoContainer:
        {
            flex: 2,
            marginTop: 10,
            // backgroundColor: '#ddd',
            padding: 10
        },

        MainContainer:
        {
            flex: 10,
            margin: 10
        },

        FlatListItemClass:
        {
            alignItems: "flex-start",
            padding: 16,
            backgroundColor: "#FFF",
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            borderRadius: 4,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            borderColor: "#ddd",
            borderWidth: 1,
        }
    });