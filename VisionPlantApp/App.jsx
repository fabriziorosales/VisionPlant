import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, Text, SafeAreaView, Modal, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import { Camera, useCameraDevice   } from 'react-native-vision-camera';
import RNFS from 'react-native-fs'; // Importa react-native-fs
import axios from "axios"; // Importa AXIOS para enviar la imagen al servidor
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import iconPlant from './assets/plant.png'
import iconReturn from './assets/return.png'
import iconCamara  from './assets/camara.png'


function App() {
  const [hasPermission, setHasPermission] = useState(false);
  //const device = useCameraDevice('back');
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })



  const [vmodal,setVmodal] = useState(false)
  const [response,setResponse] = useState('')
  const [virusIndicator, setVirusIndicator] = useState(false)
  // const devices = useCameraDevices();
  // const device = devices.back;

  const sendPhoto = async() => {
    setResponse('')
    setVirusIndicator(false)
    try {
      let resul = await axios.post('http://192.168.197.154:8000/', {image:photo})
      console.log({
        infeccion:resul.data.infeccion,
        enfermedad:resul.data.enfermedad
      });
      setVirusIndicator(resul.data.infeccion)
      setResponse(resul.data.enfermedad)
    } catch (error) {
      console.log(error);
    }
  };

  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (!device || !cameraRef.current) return;
    try {
      const photo64 = await cameraRef.current.takePhoto();
      // Usa RNFS para convertir la imagen a base64
      const base64 = await RNFS.readFile(photo64.path, 'base64');
      // Ahora `base64` contiene tu imagen codificada en base64
      setPhoto('data:image/png;base64,'+base64);
      //console.log('data:image/png;base64,'+base64);
      console.log('Sending img');
      setVmodal(true)
      await sendPhoto()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        console.log('Android');
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permiso de cámara",
            message: "La aplicación necesita acceso a tu cámara",
            buttonNeutral: "Preguntar luego",
            buttonNegative: "Cancelar",
            buttonPositive: "Aceptar"
          }
        );
        console.log('Android2');
        setHasPermission(permission === PermissionsAndroid.RESULTS.GRANTED);
        console.log('AndroidOK');
      } else {
        setHasPermission(true);
        console.log('AndroidError');
      }
    })();
  }, []);

  if (!hasPermission) { // !
    return (
    <View style={stylesError.outerContainer}>
      <View style={stylesError.innerContainer}>
        <Image source={iconCamara} style={stylesError.icon}/>
        <Text style={stylesError.errorText}>No se tiene acceso a la cámara</Text>
      </View>
    </View>
    );
  }

  if (device == null) return (


  <View style={stylesError.outerContainer}>
    <View style={stylesError.innerContainer}>
      <Image source={iconCamara} style={stylesError.icon}/>
      <Text style={stylesError.errorText}>No se encontró la cámara trasera</Text>
    </View>
  </View>
  );
 
  return (
    <SafeAreaView style={styles.container}>
      {
        !vmodal &&

        <>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
          exposure={2}

        />
        <FAB
          style={styles.fab}
          icon={iconPlant}
          onPress={() => {
            takePhoto()
          }}
        />
      </>
      }
      
      <Modal
      visible={vmodal}
      >
        <View style={[styles.container, styles.green]}>
          <Image source={{uri:photo}} style={styles.image}/>
          { response === '' ? 
            
            <ActivityIndicator animating={true} color={MD2Colors.green400} size={'large'}/>
            :
            <View>
              <Text style={[styles.textResponse, virusIndicator ? styles.noInfection : styles.infect]}>{response}</Text>
            </View>
          }

        <FAB
          style={[styles.fab, styles.return ]}
          icon={iconReturn}

          onPress={() => {
          setVmodal(false)
          }}
        />
        </View>

      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    color: '#fefefe'
  },
  textResponse:{
    color:'black',
    fontSize:32,
    paddingLeft:60
  },
  infect:{
    color:'#b92424'
  },  
  noInfection:{
    color:'#000000'
  },
  camera: {
    flex: 1,
    width: '100%',

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex:100000
  },
  green:{
    backgroundColor:'#b2ffb2'
  },
  image:{
    margin:20,
    borderRadius:4,
    height:300,
  },
  return : {
    backgroundColor:"#077fff"
  }
});
const stylesError = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202520', // Fondo verde lima
  },
  innerContainer: {
    backgroundColor: '#ff5a5a', // Fondo rosa
    borderRadius: 20, // Bordes redondeados
    padding: 20, // Espacio dentro del contenedor rosa
    flexDirection: 'column', // Icono y texto en fila
    alignItems: 'center', // Centrar verticalmente dentro del contenedor
  },
  errorText: {
    marginLeft: 10, // Espacio entre el icono y el texto
    color: 'white', // Texto en blanco
    fontSize: 26, // Tamaño de letra
  },
  icon: {
    width: 50, // Ancho del ícono
    height: 50, // Altura del ícono
    marginBottom: 10, // Espacio debajo del ícono
  }
});
export default App;