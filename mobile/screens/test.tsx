import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Alert, Button, StyleSheet, Text, View, NativeModules, Image, Platform, ImageProps, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as ImageManipulator from 'expo-image-manipulator';

let gl: OffscreenCanvasRenderingContext2D | null
let offscreen: OffscreenCanvas
let isLoaded = false
let bitmapPixels: Float32Array
let bitmapScaledPixels: Float32Array
let imageId: HTMLImageElement
let myImageScaledData: ImageData


export default function App() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  async function draw() {
    if (!selectedImage) {return}
    else{
      offscreen = new OffscreenCanvas(1000, 1000)
      gl = offscreen.getContext('2d')

      if (gl) {
        imageId = document.getElementById("smallImage") as HTMLImageElement
        console.log("GL loaded")

        gl.drawImage(imageId, 0, 0, 224, 224)
        const myImageData = gl.getImageData(0, 0, 224, 224)
        bitmapPixels = Float32Array.from(myImageData.data)
        gl.clearRect(0, 0, 224, 224)



        gl.drawImage(imageId, 0, 0, 672, 672)
        myImageScaledData = gl.getImageData(0, 0, 672, 672)

        bitmapScaledPixels = Float32Array.from(myImageScaledData.data)
        gl.save()
      
        console.log(bitmapScaledPixels)

      }
    }
  }
  
  async function drawTwo() {
    const canvas = document.getElementById("output") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")

    if (ctx) {
      ctx.drawImage(offscreen, 0, 0, 672, 672, 0, 0, 450, 450)
    }
  }

  async function openImagePickerAsync() {
  
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access Camera Roll is Required!");
      return;
    }
    const options = {base64: true, exif: true}
    const pickerResult = await ImagePicker.launchImageLibraryAsync(options);
    
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ 
      localUri: pickerResult.uri,
      localHeight: pickerResult.height,
      localWidth: pickerResult.width 
    });

    return

    
  };
  


  return(
      <View style={styles.container}>

        <Text>Hello There</Text>
        <Button title='Upload Picture' onPress={openImagePickerAsync}></Button>
        {selectedImage != null &&
        <Button title='Draw' onPress={draw}></Button>}

        {
          selectedImage !== null &&
        <View style= {styles.scrollView}>

          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <canvas id="output" width="450" height="450">
            <View>
              <img id='smallImage' src={selectedImage.localUri} width="450" height="450" alt=''/>
            </View>
          
          </canvas>
        
      </View>}
      </View>
      
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      thumbnail: {
        alignSelf: "center",
        margin: 8,
        width: 450,
        height: 450,
        resizeMode: "contain"
      },
      scrollView: {
        flexDirection: "row",
        backgroundColor: "#e9c46a",
      },
    }
)
