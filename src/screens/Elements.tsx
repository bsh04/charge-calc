import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {Header} from "../components/Header";
import {useSaveElements} from "./Elements/hooks/useSaveElements";
import {ElementsForm} from "./ElementsForm";
import {Elements as ElementsType, IElement, IElements} from "../types";
import {useSelector} from "react-redux";
import {elementsSelectors} from "../redux/slices/elementsSlice";
import {Button} from "react-native-elements";


export const Elements: React.FC = () => {
    const {save} = useSaveElements()
    const initElements = useSelector(elementsSelectors.getData())

    const [elements, setElements] = useState<Array<IElement>>(initElements)

    const handleSave = () => {
        save(elements)
    }


    return (
        <>
            <Header isMenuOpen title={"Элементы"}/>
            <ScrollView style={styles.container}>
                <ElementsForm data={elements}
                              setData={(key: ElementsType, value: number | string) => setElements(elements.map(item => item.title === key ? ({
                                  ...item, value
                              }) : ({...item})))}/>
            </ScrollView>
            <Button
                disabled={initElements === elements}
                onPress={handleSave}
                title={"Сохранить"}
                containerStyle={styles.buttonStyles}
                buttonStyle={styles.button}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: "30%",
        padding: 5,
        borderColor: "#111"
    },
    buttonStyles: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    button: {
        backgroundColor: "#4caf50"
    }
})