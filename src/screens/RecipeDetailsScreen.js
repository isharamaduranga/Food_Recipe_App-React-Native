import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
export default function RecipeDetailsScreen(props) {
    // console.log(props.route.params)
    const navigation = useNavigation()
    const item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false)
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMealData(item.idMeal)
    }, [])

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            //console.log('got Meal data ',response.data)
            if (response && response.data) {
                setMeal(response.data.meals[0])
                setLoading(false)
            }
        } catch (err) {
            console.log("error", err.message)
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i)
            }
        }
        return indexes
    }

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]){
            return match[1];
        }
        return null
    };

    return (
        <ScrollView
        className={'flex-1 bg-white'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
    >
        <StatusBar style={"light"}/>

        {/* recipe image */}
        <View className={"flex-row justify-center"}>
            <Animated.Image
                source={{uri: item.strMealThumb}}
                sharedTransitionTag={item.strMeal}
                style={{
                    width: wp(98),
                    height: hp(50),
                    borderRadius: 40,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    marginTop: 4
                }}/>
        </View>

        {/*back & favourite button a*/}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className={"w-full absolute flex-row justify-between items-center pt-14"}>
            <TouchableOpacity onPress={() => navigation.goBack()} className={"p-2 rounded-full ml-5 bg-white"}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}
                              className={"p-2 rounded-full mr-5 bg-white"}>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"}/>
            </TouchableOpacity>
        </Animated.View>

        {/*meal description*/}
        {loading ? (<Loading size={'large'} color="#FFA500" className={"mt-16"}/>) : (
            <View className={'px-4 flex justify-between space-y-4 pt-8'}>
                {/*name and area */}
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className={"space-y-2"}>
                    <Text style={{fontSize: hp(3)}} className={"font-bold flex-1 text-neutral-700"}>
                        {meal?.strMeal}
                    </Text>
                    <Text style={{fontSize: hp(2)}} className={"font-medium flex-1 text-neutral-500"}>
                        {meal?.strArea}
                    </Text>
                </Animated.View>

                {/* misc */}
                <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className={"flex-row justify-around"}>

                    <View className={"flex rounded-full bg-amber-300 p-2"}>
                        <View
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className={"bg-white rounded-full flex items-center justify-center"}
                        >
                            <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
                        </View>
                        <View className={"flex items-center py-2 space-y-1"}>
                            <Text style={{fontSize: hp(2)}} className={"font-bold text-neutral-700"}>
                                35
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className={"font-bold text-neutral-700"}>
                                Mins
                            </Text>
                        </View>
                    </View>

                    <View className={"flex rounded-full bg-amber-300 p-2"}>
                        <View
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className={"bg-white rounded-full flex items-center justify-center"}
                        >
                            <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
                        </View>
                        <View className={"flex items-center py-2 space-y-1"}>
                            <Text style={{fontSize: hp(2)}} className={"font-bold text-neutral-700"}>
                                03
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className={"font-bold text-neutral-700"}>
                                Servings
                            </Text>
                        </View>
                    </View>

                    <View className={"flex rounded-full bg-amber-300 p-2"}>
                        <View
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className={"bg-white rounded-full flex items-center justify-center"}
                        >
                            <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
                        </View>
                        <View className={"flex items-center py-2 space-y-1"}>
                            <Text style={{fontSize: hp(2)}} className={"font-bold text-neutral-700"}>
                                115
                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className={"font-bold text-neutral-700"}>
                                calories
                            </Text>
                        </View>
                    </View>

                    <View className={"flex rounded-full bg-amber-300 p-2"}>
                        <View
                            style={{height: hp(6.5), width: hp(6.5)}}
                            className={"bg-white rounded-full flex items-center justify-center"}
                        >
                            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
                        </View>
                        <View className={"flex items-center py-2 space-y-1"}>
                            <Text style={{fontSize: hp(2)}} className={"font-bold text-neutral-700"}>

                            </Text>
                            <Text style={{fontSize: hp(1.3)}} className={"font-bold text-neutral-700"}>
                                Easy
                            </Text>
                        </View>
                    </View>
                </Animated.View>


            </View>

        )}
    </ScrollView>);
}

