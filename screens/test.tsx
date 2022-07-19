import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert, Button, StyleSheet, Text, View, NativeModules, Image, Platform, ImageProps } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as fs from 'fs';

var PNG = require('pngjs')

export default function App() {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    async function draw() {
        // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        // console.log(canvas)
        // if (canvas.getContext) {
        //     const ctx = canvas.getContext('2d')
        //     if (ctx != null && selectedImage != null){
        //         // const a = <img src={selectedImage.localUri} width="150" height="150" alt='hey' /> as HTMLImageElement
        //         const a = document.getElementById("selectedImage") as HTMLImageElement
        //         ctx.drawImage(a, 0, 0)

        //         ctx.fillStyle = 'rgb(200, 0, 0)';
        //         ctx.fillRect(10, 10, 50, 50);
        
        //         ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        //         ctx.fillRect(30, 30, 50, 50);   
        //     }
        // }

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
            <Button title='Draw' onPress={draw}></Button>
            <canvas id='canvas' width="150" height="150">
                    {selectedImage != null &&
                    <img id='selectedImage' src={selectedImage.localUri} width="150" height="150" alt=''/>
                    }
            </canvas>
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
    }
)
