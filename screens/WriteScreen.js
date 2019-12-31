import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WriteHeader from '../components/WriteHeader';

import uuid from 'uuid/v1';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const { width, height } = Dimensions.get('window');
  
export default class WriteScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => {
      <MaterialCommunityIcons name="lead-pencil" size={30} style={{color:tintColor}} />
    },
    tabBarOnPress: ({navigation}) => {
      navigation.navigate('Write');
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      inputtitle: '',
      inputcontent: '',
      imageUri: '',
    }
  }

  _changetitle = (value) => {
    this.setState({inputtitle:value})
  }

  _changecontent = (value) => {
    this.setState({inputcontent:value})
  }

  
  _saveText = () => {
    if (this.state.inputtitle !== '') {
        const id = uuid
        const date = this._gettoday()
        const newpost = {
          id: id,
          title: this.state.inputtitle,
          content: this.state.inputcontent,
          date: date,
          imageUri: this.state.imageUri,
      }
      this.setState(
        {
          inputtitle: '',
          inputcontent: '',
          imageUri: ''
        }
      )
      this.props.navigation.navigate('MainScreen', {myparam:newpost})
    }
    else{
      this.props.navigation.navigate('MainScreen')
    }
  }

  _gettoday = () => {
    tyear = (new Date().getFullYear()).toString()
    tmonth = (new Date().getMonth()+1).toString()
    tday = (new Date().getDate()).toString()

    if(parseInt(tmonth) < 10){
      tmonth = '0' + tmonth
    }
    if(parseInt(tday) < 10){
      tday = '0' + tday
    }
    return (tyear+'-'+tmonth+'-'+tday)
  }


  _selectedImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.canceled) {
      this.setState({imageUri:result.uri});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <WriteHeader saveProps={this._saveText} selectImage={this._selectImage} />
          <TextInput
            onChangeText={this._changetitle}
            value={this.state.inputtitle}
            placeholder="제목을 입력하세요"
            style={styles.title}
            returnKeyType="done"
          />
          {
            this.state.imageUri?
            <Image source={{ uri: this.state.imageUri }} style={{ width: 200, height: 200 }} /> :
            null
          }
          <TextInput
            onChangeText={this._changecontent}
            value={this.state.inputcontent}
            placeholder="내용을 입력하세요"
            style={styles.content}
            multiline={true}
            returnKeyType="done"
            />
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      paddingTop:30,
    },
    contentContainer: {
      width: width - 60,
    },
    title: {
      marginVertical: 30,
      fontSize: 30,
      paddingBottom: 12,
      borderBottomWidth: 2,
    },
    content: {
      fontSize: 20,
    }
});
