import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { IPageProps } from '../interfaces/navigation';
import { Product as IProduct } from '../services/fakeStore';
import { storagePushArray } from '../storage';
import { formatPrice } from '../utils';

export default function Product({navigation}: IPageProps) {
  const {params} = useRoute();
  const {id} = params as {id: string};

  const {data, isLoading} = useQuery(['products']);

  const product = ((data || []) as IProduct[]).find(
    item => String(item.id) == id,
  );

  const addToCart = () => {
    storagePushArray('cart', product);

    return navigation.goBack();
  };

  if (!product) {
    navigation.goBack();

    return (
      <SafeAreaView>
        <ActivityIndicator className="w-full h-screen" size={64} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full">
      <>
        {isLoading && (
          <ActivityIndicator className="w-full h-screen" size={64} />
        )}
        {data && (
          <View className="flex-1 bg-white items-center">
            <ImageBackground
              source={{uri: product.image}}
              resizeMode="contain"
              className="w-full h-48 items-start my-6">
              <TouchableOpacity
                className="p-4"
                onPress={() => navigation.goBack()}>
                <Icon name="back" color="#000000" size={32} />
              </TouchableOpacity>
            </ImageBackground>

            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                padding: 16,
              }}
              className="bg-white rounded-t-3xl w-full shadow-xl shadow-black">
              <Text
                numberOfLines={2}
                className="text-center text-3xl font-bold text-black">
                {product.title}
              </Text>

              <Text
                className="text-lg text-black font-bold mt-6"
                numberOfLines={2}>
                {formatPrice(product.price)}
              </Text>

              <Text numberOfLines={6} className="text-lg mt-6 text-justify">
                {product.description}
              </Text>

              <TouchableOpacity
                className="items-center p-4 bg-black rounded-3xl mt-[40%]"
                onPress={addToCart}>
                <Icon name="shoppingcart" color="#FFFFFF" size={32} />
                <Text className="text-white text-xl font-bold">
                  Adicionar ao carrinho
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </>
    </SafeAreaView>
  );
}
