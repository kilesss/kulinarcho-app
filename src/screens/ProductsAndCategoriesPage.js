
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './../styles/styles'

const ProductsAndCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>products and categories Screen!</Text>
      <Ionicons name="md-person-circle-outline" size={80} color="#006600" />
    </View>
  );
};

export default ProductsAndCategories;