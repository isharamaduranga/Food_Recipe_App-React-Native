import {Image, ScrollView, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios"
import {Recipes} from "../components/recipes";

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('Brief')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            //console.log('got categories ',response.data)
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (err) {
            console.log("error", err.message)
        }
    };


    return (<View className="flex-1  bg-white">
            <StatusBar style={"dark"}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className="space-y-6 pt-14"
            >

                {/* avatar and notification icon*/}
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require('../../assets/images/avatar.png')}
                           style={{height: hp(5.5), width: hp(5.5)}}/>
                    <BellIcon size={hp(4)} color="gray"/>
                </View>

                {/*greeting section */}
                <View className="mx-4 space-y-2">
                    <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Hello John</Text>

                    <View className="">
                        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600 ">Make your own
                            food</Text>
                    </View>
                    <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600 ">
                        Stay at <Text className="text-amber-400">home</Text>
                    </Text>
                </View>

                {/*Search Bar */}
                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder={'Search any recipe'}
                        placeholderTextColor={'gray'}
                        style={{fontSize: hp(1.7)}}
                        className={'flex-1 text-base mb-1 pl-3 tracking-wider'}
                    />

                    <View className={"bg-white rounded-full p-3"}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokWidth={3} color={"gray"}/>
                    </View>
                </View>

                {/*Categories*/}
                <View>
                    {categories.length > 0 &&
                        <Categories
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}/>
                    }
                </View>

                {/*recipes*/}

                <View>
                    <Recipes categories={categories}/>
                </View>
            </ScrollView>

        </View>);
}