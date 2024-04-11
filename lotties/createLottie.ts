import {CSSProperties} from "react";
import {LottieOptions, useLottie} from "lottie-react";
interface LottieAnimationType {

}
export const createLottie = (options:LottieOptions<"svg">,style?:CSSProperties) => {
    const { View } = useLottie(options, style);
    return View;
}
export default createLottie;