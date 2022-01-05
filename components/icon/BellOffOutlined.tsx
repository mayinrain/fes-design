
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M608 917.461a21.333 21.333 0 0 1 21.333 21.334v21.333A21.333 21.333 0 0 1 608 981.461H416a21.333 21.333 0 0 1-21.333-21.333v-21.333A21.333 21.333 0 0 1 416 917.46h192zM126.25 111.147a21.333 21.333 0 0 1 27.18-2.475l2.986 2.475 756.437 756.48a21.333 21.333 0 0 1 2.475 27.178l-2.475 2.987-15.104 15.061a21.333 21.333 0 0 1-27.178 2.475l-2.987-2.475-38.4-38.4-637.184.043v-1.195h-21.333a21.333 21.333 0 0 1-21.334-21.333v-18.944a21.333 21.333 0 0 1 21.334-21.333H192V469.589c0-65.962 19.968-127.232 54.187-178.176L111.104 156.416a21.333 21.333 0 0 1-2.475-27.221l2.475-2.987 15.104-15.061zm129.92 348.842-.17 9.6v340.907h509.227L292.48 337.706a254.592 254.592 0 0 0-36.267 122.24zM522.668 42.752A21.333 21.333 0 0 1 544 64.085v87.083a320 320 0 0 1 288 318.421v256.982l-64-64V469.589A256 256 0 0 0 521.6 213.76l-9.6-.17c-54.613 0-105.173 17.066-146.773 46.207l-45.739-45.824a318.336 318.336 0 0 1 160.555-62.805v-87.04a21.333 21.333 0 0 1 21.333-21.333h21.333z"/></svg>
    </IconWrapper>
);
