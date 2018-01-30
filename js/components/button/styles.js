import React from 'react-native';
import {Colors} from '../../theme';
var styles = React.StyleSheet.create({
    container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Colors.brandYellow,
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff'
    }
});

export default styles;
