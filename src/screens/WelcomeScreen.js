import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import {useNavigation} from "@react-navigation/native";


export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation()

  useEffect(()=>{
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(()=> ring1Padding.value = withSpring(ring1Padding.value+hp(5)),100 );
    setTimeout(()=> ring2Padding.value = withSpring(ring2Padding.value+hp(5.5)),300 );

    setTimeout(() => navigation.navigate('Home'),2000)
  },[])

  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style={"light"} />

      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding:ring2Padding}}>
        <Animated.View className="bg-white/30 rounded-full"style={{padding:ring1Padding}}>
          <Image
            source={require("../../assets/images/meal.png")}
            style={{ width: hp(24), height: hp(24) }}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text style={{fontSize:hp(7)}}className="font-bold text-white tracking-widest text-6xl">
            Foody
        </Text>
        <Text style={{fontSize:hp(2)}} className="font-medium text-white tracking-widest text-lg">
            Food is always right
        </Text>
      </View>
    </View>
  );
}
