import {StackNavigator,DrawerNavigator} from 'react-navigation';
import Home from '../components/home';
export const INITIAL_ROUTE='home';

const Routes = {
    home : {
        screen : Home
    }
};


export default Routes;
