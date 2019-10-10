/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//import navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import screens
import DangNhap from './component/DangNhap';
import TrangChu from './component/TrangChu';
import DanhSachTruyen from './component/DanhSachTruyen';
import ChiTietTruyen from './component/ChiTietTruyen';
const StackNavigatorScreens = createStackNavigator(
  {
    dn: DangNhap,
    tc: TrangChu,
    dst: DanhSachTruyen,
    ctt: ChiTietTruyen
  },
  {
    initialRouteName: 'dn',
  }
);

export default createAppContainer(StackNavigatorScreens);