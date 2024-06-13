import { Pressable, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const ListPicker = ({ value, list, returnValue, placeholder }) => {
    function changeValue(option) {
        returnValue(option);
    }

    return (
        <ModalSelector data={list} onChange={changeValue} multiple={false}>
            <Pressable>
                <Text>{value ?? placeholder}</Text>
            </Pressable>
        </ModalSelector>
    );
}

export default ListPicker;