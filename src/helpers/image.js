import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";
import {useState, useEffect} from 'react'

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null)
    const {uri} = props


    useEffect(()=>{
        const getCachedImageData = async () => {
          try {
              const cachedImageData = await AsyncStorage.getItem(uri);

              if (cachedImageData) {
                  setCachedSource({uri:cachedImageData})
              }else{
                  const response = await fetch(uri);
                  const imageBlob = await response.blob();
                  const base64Data= await new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(imageBlob)
                      reader.onloadend = () =>{
                          resolve(reader.result)
                      }
                  });
                  await AsyncStorage.setItem(uri,base64Data);
                  setCachedSource({uri:base64Data});
              }

          }catch (error) {
              console.error('Error Caching image: ',error)
              setCachedSource({uri})
          }
        }

        getCachedImageData();

    },[uri]);

  return <Animated.Image source={cachedSource} {...props} />

}