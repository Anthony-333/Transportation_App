import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en-US";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-X-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// if we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 0.5;

const RideOptionsCard = () => {
  try {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
      <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NavigateCard")}
            style={tw`absolute top-3 left-5 p-1 rounded-full z-20`}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>

          <Text style={tw`text-center py-3 text-xl`}>
            Select a Ride - {travelTimeInformation?.distance?.text}
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{
                  width: 85,
                  height: 85,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>Travel time...</Text>
              </View>

              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={tw`mt-auto border-t border-gray-200`}>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black py-3 m-2  ${!selected && "bg-gray-300"}`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } catch (err) {
    console.log("There is an Error on Map API");
  }
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
