import React from 'react';
import { View, Text, ActivityIndicator, TouchableHighlight, Alert, FlatList, StyleSheet } from 'react-native';
import { GetToanBoTheLoaiService } from './Api'

export default class TrangChu extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Danh sach the loai',
        header: null
    });

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        fetch(GetToanBoTheLoaiService).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    isLoading: false,
                    dataContent: responseData.content
                }, function () {

                });
            }).catch(function (err) {
                Alert.alert("Đã có lỗi xảy ra...");
                console.log(err);
            }).done();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.Container}>
                <View style={styles.HeaderContainer}>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Danh sach the loai</Text>
                </View>
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
                onPress={() => { this.props.navigation.navigate('dst', { truyen: this.props.item.id_the_loai }) }}>
                <View style={styles.FlatListItemClass}>
                    <View>
                        <Text style={{fontSize: 18}}>{this.props.item.ten_the_loai}</Text>
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
            padding: 20,
            flex: .5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#32a852'
        },

        MainContainer:
        {
            flex: 15,
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