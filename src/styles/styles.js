import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,

  },
  title: {
    color: "#006600", fontSize: 40
  },

  customButton:{
    alignSelf: "stretch",
    borderRadius: 6,
    shadowColor: "#999",
    elevation: 3,
  },
  customButtonText: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    fontWeight: "bold"
  },
  boldTextButton: {
    color: "#006600",
    fontWeight: "bold"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B4C4C"
  }
});

export default styles;


