import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IPageProps } from '../interfaces/navigation';
import { getProducts } from '../services/fakeStore';
import { formatPrice } from '../utils';

export default function Home({navigation}: IPageProps) {
  const {data, isLoading} = useQuery(['products'], getProducts);

  return (
    <>
      <SafeAreaView>
        {isLoading && (
          <ActivityIndicator className="w-full h-screen" size={64} />
        )}
        {data && (
          <View className="flex-col items-center bg-slate-200 py-6 px-4 gap-y-6">
            <Text className="text-center text-3xl font-bold text-black">
              Tech Loja
            </Text>

            <View>
              <Carousel
                loop
                snapEnabled
                width={Dimensions.get('window').width - 32}
                height={280 / 2}
                autoPlay={true}
                data={data.slice(0, 5)}
                autoPlayInterval={3000}
                scrollAnimationDuration={300}
                renderItem={({item}) => (
                  <TouchableOpacity
                    className="flex-row flex-1 rounded-xl overflow-hidden bg-white"
                    onPress={() =>
                      navigation.navigate('product', {id: item.id})
                    }>
                    <Image
                      source={{uri: item.image}}
                      resizeMode="contain"
                      className="w-1/3 h-full"
                    />

                    <View className="flex-col gap-4 w-2/3 p-2">
                      <Text
                        className="text-xl text-black font-extrabold"
                        numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text className="text-lg text-black" numberOfLines={2}>
                        {formatPrice(item.price)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View className="flex-wrap flex-row gap-y-2 gap-x-2 px-4 rounded-lg w-full"></View>
          </View>
        )}
        <StatusBar barStyle="default" />
      </SafeAreaView>
      <FlatList
        className="bg-slate-200 px-2"
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            className="flex-1 m-2 items-center bg-white  h-64 rounded-xl shadow-lg shadow-black p-2"
            onPress={() => navigation.navigate('product', {id: item.id})}>
            <Image
              source={{uri: item.image}}
              resizeMode="contain"
              className="w-1/2 h-1/2"
            />
            <Text numberOfLines={2} className="font-bold text-center mt-4">
              {item.title}
            </Text>
            <Text className="font-extrabold text-black text-xl text-center mt-4">
              {formatPrice(item.price)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
