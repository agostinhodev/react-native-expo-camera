import React, {useState, useEffect, useRef  } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {

  const camera = useRef(null);
  const [ type, setType ] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission]  =useState(null); 
  const [picture, setPicture] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  useEffect(()=>{

    (async()=>{

      const {status} = await Camera.requestPermissionsAsync();

      setHaspermission(status === 'granted');

    })();

  },[]);

  if(hasPermission === null){

    return <View/>;

  }


  if(hasPermission === false){

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
        <Text >Acesso à câmera foi negado</Text>
      </View>
    );

  }
  async function takePicture(){

    if(camera){

      const data = await camera.current.takePictureAsync();
      setPicture(data.uri);
      setIsVisibleModal(true);

    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera

        ref={camera}
        style={
          { flex: 1}
        
        }
        type={type}
        ratio="16:9"

      >

      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
        <TouchableOpacity
        style={{position: "absolute", bottom: 20, left: 20, backgroundColor: '#fff', borderRadius: 50}}
        onPress={()=>{

          setType(            
            type === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front: 
            Camera.Constants.Type.back
          );

        }}
        >
          <Image source={require('./assets/change.png')} style={{width: 50, height: 50}}/>
        </TouchableOpacity>
      </View>

      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture}>        
        <FontAwesome name="camera" size={25} color="#fff"/>
      </TouchableOpacity>

      {

        picture && 
        (<Modal
          
          animationType="slide"
          transparent={false}
          visible={isVisibleModal}
          
        >

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity

              onPress={()=>setIsVisibleModal(false)}

            >
              <FontAwesome name="window-close" size={50} color="#FF0000"/>
            </TouchableOpacity>

            <Image

              style={{

                width: '100%', height: '90%', borderRadius: 20

              }}
              
              
              source={{uri: picture}}
            />

          </View>

        </Modal>)

      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  button:{

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,

  }

});
