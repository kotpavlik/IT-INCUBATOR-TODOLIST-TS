import  {useLottie} from 'lottie-react';
import groovyWalkAnimation from "./ton_duck_agadsxcaakcuoes.json";
import {CSSProperties} from 'react';


const style:CSSProperties = {
    overflow: 'hidden',
    borderRadius: 100,
    width: 70,
    height: 90,
    marginBottom: -20,
    position:"absolute",
    bottom:10,
};
export const ExampleAnimation = () => {
    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        autoplay: true,
    }

    const { View } = useLottie(options, style);

    return View;
}
