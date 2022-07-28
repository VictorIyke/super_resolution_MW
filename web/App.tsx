import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image, NativeModules } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import * as ort from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';
import React, {createContext, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-modules-core';
import * as ortWeb from "onnxruntime-web";
import * as ImageManipulator from 'expo-image-manipulator';
import { pixelsRGBToYCbCr, pixelsYCbCrToRGB } from './pixelConversions';

const bitmapModule = NativeModules.Bitmap


let model: ortWeb.InferenceSession;

let kdv: OffscreenCanvasRenderingContext2D | null

let isLoaded = false;
let floatPixelsY = new Float32Array(224 * 224)
let floatPixelsCb = new Float32Array(672 * 672)
let floatPixelsCr = new Float32Array(672 * 672)
const [imgHeight, imgWidth] = [224, 224]
const [postImgHeight, postImgWidth] = [imgHeight*3, imgWidth*3]
let bitmapPixel: number[] = Array(imgHeight*imgWidth);
let bitmapScaledPixel: number[] = Array(imgHeight*imgWidth);

let myImageScaledData: ImageData

const offscreen = new OffscreenCanvas(672, 672)



export default function App() {
  
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [outputImage, setOutputImage] = useState<any>(null);
  const [myModel, setModel] = useState(model);

  async function loadModel() {
    try {
      console.log ("About to load model")
      const assets = await Asset.loadAsync(require('./assets/super_resnet12.ort'));
      const modelUri = assets[0].localUri;
  
      if (!modelUri) {
        console.log("Model loaded unsuccessfully")
      } else {
        setModel(
          await ortWeb.InferenceSession.create(modelUri)
        )
        console.log("Model loaded successfully")
      }
    } catch (e) {
      throw e;
    }
  }
  
  
  
  async function runModel() {
    try {

      const inputData = await preProcess()
      const feeds = {};
      feeds[myModel.inputNames[0]] = inputData;
      const fetches = await myModel.run(feeds);
      const output = fetches[myModel.outputNames[0]];
      if (!output) {
        console.log("Model ran unsuccessfully")
      } else {
        console.log("Model ran successfully", `output shape: ${output.dims}`)
        const outputArray = output.data as Float32Array
        await postProcess(outputArray);
      }
    } catch (e) {
      throw e;
    }
  }

  


  async function preProcess(){

    await draw();
    floatPixelsY.forEach((value, index) => {

      const currentIndex = index * 4;
      const red = bitmapPixel[currentIndex]
      const green = bitmapPixel[currentIndex + 1]
      const blue = bitmapPixel[currentIndex + 2]

      floatPixelsY[index] = pixelsRGBToYCbCr(red, green, blue, "y")
    })

    floatPixelsCb.forEach((value, index) => {

      const currentIndex = index * 4;
      const red = bitmapScaledPixel[currentIndex]
      const green = bitmapScaledPixel[currentIndex + 1]
      const blue = bitmapScaledPixel[currentIndex + 2]
      
      floatPixelsCb[index] = pixelsRGBToYCbCr(red, green, blue, "cb")
      floatPixelsCr[index] = pixelsRGBToYCbCr(red, green, blue, "cr")
    })
    let tensor: ortWeb.Tensor = new ortWeb.Tensor(floatPixelsY, [1, 1, imgHeight, imgWidth])
    return tensor
  }

  async function postProcess(outputArray: Float32Array) {
      outputArray.forEach((value, index) => {
        const pixel = pixelsYCbCrToRGB(value, floatPixelsCb[index], floatPixelsCr[index])

        const currentIndex = index * 4;
        const data = myImageScaledData.data
        data[currentIndex] = pixel.redPixel
        data[currentIndex + 1] = pixel.greenPixel
        data[currentIndex + 2] = pixel.bluePixel


      })

      kdv.putImageData(myImageScaledData, 0, 0);
      kdv.save();
      const canvas = document.getElementById("canvas") as HTMLCanvasElement
      const ctx = canvas.getContext("2d")
      if (ctx) {
      
        ctx.drawImage(offscreen, 0, 0, 672, 672, 8, 0, 492, 484)
        ctx.save()

      }
  
  
  }

  async function draw() {
    const image1 = document.getElementById('selectedImage') as HTMLImageElement
    kdv = offscreen.getContext('2d')



    if (selectedImage != null && kdv) {
        //console.log("GL loaded")



        kdv.drawImage(image1, 0, 0, 224, 224)
        const myImageData = kdv.getImageData(0, 0, 224, 224)
        bitmapPixel = Array.from(myImageData.data)
        kdv.clearRect(0, 0, 224, 224)



   
        kdv.drawImage(image1, 0, 0, 672, 672)
        myImageScaledData = kdv.getImageData(0, 0, 672, 672)
        kdv.clearRect(0, 0, 672, 672)
        bitmapScaledPixel = Array.from(myImageScaledData.data)
        }
    
    }

    

  let openImagePickerAsync = async () => {
    console.log("About to pick an image")
    const options = {'base64': true}

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync(options);

    if (pickerResult.cancelled === true) {
      return;
    }

    const imageResult = await ImageManipulator.manipulateAsync(
      pickerResult.uri, [
        {resize: {height: imgHeight, width: imgWidth}}
      ]
    )

    

    console.log(pickerResult.height, pickerResult.width)
    setSelectedImage({ localUri: imageResult.uri });

  };

  if (!isLoaded) {
    loadModel().then(() => {
      isLoaded = true;
    })
    
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        To upload a photo, press the button!
      </Text>
      <View style = {{flexDirection: "row"}}>
      {selectedImage != null &&
      
      <Image
      source={{ uri: selectedImage.localUri }}
      style={styles.thumbnail}
    />}
        
      {selectedImage != null &&  
        <canvas id='canvas' width="500" height="500">
            
            <img id='selectedImage' src={selectedImage.localUri} width="250" height="250" alt='' />
            
        </canvas>

      }
      </View>

      <TouchableOpacity onPress={openImagePickerAsync} >
        <Button
        title="Pick a photo <3"
        onPress={openImagePickerAsync}
        />

      </TouchableOpacity>

      <Button
        title='Run Model'
        onPress={runModel}
        />

      {/* <Button
        title='Draw'
        onPress={draw}
        /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd166',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  thumbnail: {
    width: 500,
    height: 500,
    resizeMode: "contain",
    margin: 8,

  },

  instructions: {
    color: 'white',
    marginBottom: 10
  },

  buttonContainer: {
    backgroundColor: 'white'
  }
});