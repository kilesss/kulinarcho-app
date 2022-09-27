import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#15A051", fontSize: 40
  },

  customButton:{
    alignSelf: "stretch",
    borderRadius: 8,
    shadowColor: "#999",
    elevation: 1,
    backgroundColor: "#fff",
    marginVertical: 5
  },
  customButtonText: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  boldTextButton: {
    color: "#15A051",
    fontWeight: "bold",
    marginBottom: 30
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4B4C4C",
    marginTop: 10,
    marginBottom: 5
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4B4C4C"
  },
  bigHeading: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1B1B1B"
  },
  smallGreenText: {
    fontWeight: "bold",
    color: "#15A051",
    fontSize: 13
  }

});

export default styles;


