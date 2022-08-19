import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  title: {
    color: "#006600", fontSize: 40
  },

  bottomNav: {
    display:'flex',
    alignSelf: "stretch",
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
    flexDirection: 'row'

  },
  bottomNavItem:{
    display: "flex",
    padding: 15,
    justifyContent: 'space-around',
    width: "20%",
    backgroundColor: '#fff'
  },
  bottomNavIcon:{
    color: '#c0c0c0',
    textAlign: 'center'
  }

});

export default styles;


