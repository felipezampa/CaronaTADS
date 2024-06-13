import { Switch } from 'react-native-switch';
import { View, StyleSheet, Text } from 'react-native';
import { Accent, White } from '../../../../assets/colors';

const CustomSwitch = ({ activeText, inactiveText, switchValue, onSwitchHandler }) => {
    if (switchValue === undefined) {
        switchValue = false;
    }

    function changeValue() {
        switchValue = !switchValue;
        onSwitchHandler();
    }

    const circleText = () => {
        let text = <Text style={[styles.inactiveText, styles.circleText]}>{inactiveText}</Text>;
        if (switchValue){
            text = <Text style={[styles.activeText, styles.circleText]}>{activeText}</Text>
        }

        return(
            <View style={styles.circleTextContainer}>
                {text}
            </View>
        );
    }

    return (
        <Switch
            onValueChange={changeValue}
            circleActiveColor={White}
            circleInActiveColor={Accent}
            backgroundActive={Accent}
            backgroundInactive={White}
            renderInsideCircle={circleText}
            renderActiveText={false}
            renderInActiveText={false}
            value={switchValue}
        ></Switch>
    );
}

const styles = StyleSheet.create({
    inactiveText: {
        color: White,
        textAlign: 'center',
    },
    activeText: {
        color: Accent,
    }
});
export default CustomSwitch;