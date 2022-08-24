import {Dimensions, Modal, Text, TextInput, TouchableWithoutFeedback, View} from "react-native"
import React from "react"
import {CustomButton} from "./CustomButton";
import shoppingListStyle from "../../styles/stylesShoppingList";
import language from "../../language/language";

export class BottomPopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show: true})
    }

    close = () =>{
        this.setState({show: false})
    }


    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: "100%"}}/>
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch}
                                      style={{flex: 1, width: "100%"}}
            >
                {view}
            </TouchableWithoutFeedback>
        )
    }


    render() {

        let {show} = this.state

        let {onTouchOutside, title, product, amount, price} = this.props;
        return (
            <Modal animationType={"slide"}
                   transparent={true}
                   visible={show}
                   onRequestClose={this.close}>
                <View style={shoppingListStyle.outsideTouchable}>
                    {this.renderOutsideTouchable(onTouchOutside)}

                    <View style={shoppingListStyle.popup}>
                        <Text style={shoppingListStyle.popupTitle}>{title}</Text>

                        <View>
                            <View style={shoppingListStyle.popupPrice}>
                                <TextInput style={[shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                                           placeholder={"e.g. Broccoli"}
                                           value={product}
                                />
                            </View>
                            <View style={shoppingListStyle.popupAmount}>
                                <Text>{language("amount")}</Text>
                                <TextInput style={shoppingListStyle.popupInput}
                                           value={amount}
                                           placeholder={"2"}
                                />
                            </View>

                            <View style={shoppingListStyle.popupPrice}>
                                <Text>{language("price")}</Text>
                                <TextInput style={shoppingListStyle.popupInput}
                                           value={price}
                                           placeholder={"e.g. 3лв"}/>
                            </View>

                            <View style={shoppingListStyle.popupButtons}>
                                <Text style={{marginRight: 15}}
                                      onPress={this.close}>
                                    {language("cancel")}
                                </Text>
                                <CustomButton title={language("add")} txtColor={"#fff"}/>
                            </View>
                        </View>

                    </View>

                </View>

            </Modal>
        );
    }

}