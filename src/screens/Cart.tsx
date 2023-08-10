import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { IPageProps } from '../interfaces/navigation';
import { Product } from '../services/fakeStore';
import { storage, storageDeleteFromArray } from '../storage';
import { formatPrice } from '../utils';

export default function Cart({navigation}: IPageProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const rawCart = storage.getString('cart');
      if (rawCart) setProducts(JSON.parse(rawCart));
    }, []),
  );

  const removeFromCart = (id: number) => {
    const newCart = storageDeleteFromArray('cart', id);
    if (newCart) setProducts(newCart);
  };

  if (!products.length)
    return (
      <>
        <View className="flex-col items-center bg-slate-200 py-6 px-4 gap-y-6">
          <Text className="text-center text-xl font-bold text-black">
            Carrinho
          </Text>
        </View>
        <SafeAreaView className="justify-center bg-slate-200 items-center h-full w-full">
          <Text className="text-lg">Seu carrinho está vazio</Text>
        </SafeAreaView>
      </>
    );
  else
    return (
      <>
        <View className="flex-col items-center bg-slate-200 py-6 px-4 gap-y-6">
          <Text className="text-center text-xl font-bold text-black">
            Carrinho
          </Text>
        </View>
        <FlatList
          className="bg-slate-200 px-2"
          numColumns={1}
          data={products}
          renderItem={({item}) => (
            <TouchableOpacity
              className="flex-row m-2 items-center bg-white h-56 rounded-xl shadow-lg shadow-black p-2"
              onPress={() => navigation.navigate('product', {id: item.id})}>
              <View className="flex-col items-center w-1/2">
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
                <Text numberOfLines={2} className="font-bold text-center mt-4">
                  {item.title}
                </Text>
              </View>

              <View className="w-1/2 flex-col justify-between items-center mt-4 px-2">
                <Text className="font-extrabold text-black text-2xl">
                  {formatPrice(item.price)}
                </Text>

                <TouchableOpacity
                  className="items-center rounded-3xl mt-[40%]"
                  onPress={() => {
                    removeFromCart(item.id);
                  }}>
                  <Icon name="delete" color="red" size={32} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    );
}
