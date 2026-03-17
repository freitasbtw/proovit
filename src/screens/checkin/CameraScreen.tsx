import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation, useRoute } from '@react-navigation/native';

export function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !loading) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        
        // Compress the image before uploading to save bandwidth and storage
        const manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 800 } }], // Redimensionando
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compressão
        );

        console.log('Manipulated image:', manipResult.uri);
        
        // Simular haptic + Confetti + fechar
        Alert.alert('Sucesso!', '+15 pts de dopamina! 🔥', [
          { text: 'Irraaa!', onPress: () => navigation.goBack() }
        ]);

      } catch (e) {
        Alert.alert('Erro', 'Falha ao tirar foto');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureBtn} 
            onPress={takePicture}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <View style={styles.innerBtn} />}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  innerBtn: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#fff',
  }
});