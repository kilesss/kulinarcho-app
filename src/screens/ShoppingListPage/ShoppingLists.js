import React, {useState} from "react";
import {FlatList, Text, View} from "react-native";
import styles from '../../styles/styles'
import language from '../../language/language';
import {ShoppingListCard} from "../../components/display/ShoppingListCard";
import {CustomButton} from "../../components/display/CustomButton";
import stylesShoppingList from "../../styles/stylesShoppingList";
import AddShoppingListModal from "../../components/display/AddShoppingListModal";

export default function ShoppingListsPage({ navigation }) {

	const [shoppingLists, editShoppingLists] = useState([
		{ key: '1', title: 'Списък за пазар 1', numItems: "6", bgColor: "#6FC293"},
		{ key: '2', title: 'Списък за пазар 2', numItems: "32", bgColor: "#698FFB"},
		{ key: '3', title: 'Списък за пазар 3', numItems: "4", bgColor: "#B587FF"},
		{ key: '4', title: 'Списък за пазар 4', numItems: "4", bgColor: "#B587FF"},
		{ key: '5', title: 'Списък за пазар 5', numItems: "4", bgColor: "#B587FF"},
		{ key: '6', title: 'Списък за пазар 6', numItems: "4", bgColor: "#B587FF"},
	]);

	const remove = (i) => {
		const arr = shoppingLists.filter((item) => item.key !== i);
		editShoppingLists(arr);
		setChangeModalVisible(!changeModalVisible)
	};

	const add = (text, numItems, bgColor) => {
		editShoppingLists( (prevShoppingLists) => {
			setAddModalVisible(!addModalVisible)
			return [
				{key: Math.random().toString(), title:text, numItems: numItems, bgColor: bgColor},
				...prevShoppingLists
			]
		})
	}

	const change = (item) => {
		console.log("edit function")
	}

	const [modalData, setModalData] = useState([]);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [changeModalVisible, setChangeModalVisible] = useState(false);

	const showEditProduct = (item) => {
		setChangeModalVisible(true)
		setModalData(item)
	};

	return (

		<View style={styles.container}>
			<AddShoppingListModal modalVisible={addModalVisible}
								  setModalVisible={setAddModalVisible}
								  modalTitle={language("newShoppingList")}
								  buttonTitle={language("add")}
								  showDeleteOption={false}
								  addFunctionality={add}
			/>

			<AddShoppingListModal modalVisible={changeModalVisible}
								  setModalVisible={setChangeModalVisible}
								  modalTitle={language("editShoppingList")}
								  buttonTitle={language("change")}
								  modalData={modalData.title}
								  showDeleteOption={true}
								  deleteFunctionality={() => remove(modalData.key)}
			/>


			<View style={stylesShoppingList.buttonWithTitle}>
				<View style={{flex: 2}}>
					<Text style={styles.heading}>{language("shoppingLists")}</Text>
				</View>
				<View>
					<CustomButton title={language("add")}
								  bgColor={"#15A051"}
								  txtColor={"#fff"}
								  padding={7}
								  onPress={() => setAddModalVisible(true)}
					/>
				</View>
			</View>

			<FlatList data={shoppingLists}
					  style={{alignSelf:"stretch"}}
					  renderItem={({item}) =>(
						<ShoppingListCard bgColor={item.bgColor}
										  title={item.title}
										  numItems={item.numItems}
										  onPress={() => navigation.navigate('Shopping List Details', {
											  key: item.key,
											  title: item.title,
										  })}
										  onPressEdit={() => {showEditProduct(item)}}
						/>
					  )}/>

		</View>
	);
}