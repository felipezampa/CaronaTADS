import { View, StyleSheet } from 'react-native';
import CustomSwitchButton from './CustomSwitchButton';

const availableWeekDays = [
    { "key": "Dom", "label": "D" },
    { "key": "Seg", "label": "S" },
    { "key": "Ter", "label": "T" },
    { "key": "Qua", "label": "Q" },
    { "key": "Qui", "label": "Q" },
    { "key": "Sex", "label": "S" },
    { "key": "Sáb", "label": "S" }
];


const WeekDaySelector = ({ weekDays, returnWeekDays }) => {
    function selectDay(day) {
        const newWeekDays = weekDays;
        if (newWeekDays.includes(day)) {
            // Remove o dia
            newWeekDays.splice(newWeekDays.indexOf(day), 1);
        } else {
            newWeekDays.push(day);
        }
        returnWeekDays(newWeekDays);
    }

    return (
        <View style={styles.days}>
            {availableWeekDays.map((item) => {
                return (
                    <CustomSwitchButton key={item.key} label={item.label} onClickHandler={() => selectDay(item.key)}
                        containerStyle={{ marginHorizontal: 2, minWidth: 40, width: 40 }}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    days: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
        width: "100%"
    }
});

export default WeekDaySelector;