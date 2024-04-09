import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Avatar, { genConfig } from '@zamplyy/react-native-nice-avatar';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios';

export default function HomeScreen() {

  const [activeCategory,setActiveCategory] = useState('Beef');
  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ' , response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
 const getRecipes = async(category='Beef')=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got Recipes: ' , response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  return (
    <View className="flex-1">
      <StatusBar style='dark'/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Avatar style={{ width: hp(5), height: hp(5) }} />
          <BellIcon size={hp(4)} color="gray"/>
        </View>


        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize:hp(1.7)}} className="text-neutral-600">Hello, Noman!</Text>
          <View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">Make your own food,</Text>
          </View>
          <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>


        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize:hp(1.70)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
          </View>
        </View>

        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>

        <View>
          {/* {categories.length>0 &&<Recipes/>} */}
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}