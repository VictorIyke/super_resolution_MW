import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image, NativeModules } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import * as ort from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';
import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-modules-core';
import * as ortWeb from "onnxruntime-web";
import * as ImageManipulator from 'expo-image-manipulator';

let ctx: CanvasRenderingContext2D | null



export default async function draw(selectedImage) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    
    if (canvas.getContext) {
        ctx = canvas.getContext('2d')
        if (ctx != null && selectedImage != null){
            const imagId = document.getElementById("selectedImage") as HTMLImageElement
            ctx.drawImage(imagId, 0, 0)

            const myImageData = ctx!!.getImageData(0, 0, 224, 224)
            return Array.from(myImageData.data)
            //console.log(bitmapPixel)
          }
    }

    return (
    <canvas id='canvas' width="224" height="224">
    {selectedImage != null &&
    <img id='selectedImage' src={selectedImage.localUri} width="224" height="224" alt='' />
    }
    </canvas>
    )
}

