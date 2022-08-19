import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  title: {
    color: "#006600", fontSize: 40
  },

  customButton:{
    width: "80%",
    padding: 15,
    borderRadius: 6,
    shadowColor: "#999",
    elevation: 5,
    margin: 5

  },
  customButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },


});

export default styles;


