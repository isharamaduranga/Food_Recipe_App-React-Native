import React from 'react';
import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function WelcomeScreen() {
    return (
        <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
            <StatusBar style={"dark"} />
            <Text>hello How are youuuu</Text>
        </View>
    );
}