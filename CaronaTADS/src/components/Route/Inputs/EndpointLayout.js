import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomSwitch from './CustomSwitch';
import ListPicker from './ListPicker';
import { White } from '../../../../assets/colors';

const EndpointLayout = ({ placesOptions, setPlace, placeIsCampus, switchPlaceType }) => {
    const [listPickerValue, setListPickerValue] = useState(null);
    const placeIsCampusLabel = placeIsCampus ? "campus" : "bairro";

    function returnPlace(endpoint) {
        setPlace(endpoint);
        setListPickerValue(endpoint.name);
    }

    function changePlaceType() {
        switchPlaceType();
        setListPickerValue(null);
    }

    return (
        <View style={styles.endpoint}>
            <View style={styles.endpointValue}>
                <ListPicker

                    value={listPickerValue}
                    placeholder={"Selecione um " + placeIsCampusLabel}
                    list={placesOptions[placeIsCampus]}
                    returnValue={returnPlace}
                />
            </View>
            <View style={styles.endpointType}>
                <CustomSwitch
                    activeText={"C"}
                    inactiveText={"B"}
                    switchValue={placeIsCampus}
                    onSwitchHandler={changePlaceType}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    endpoint: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    endpointType: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
    endpointValue: {
        backgroundColor: White,
        paddingVertical: 10,
        width: 250,
        borderRadius: 8,
        alignItems: "center"
    }
})


export default EndpointLayout;