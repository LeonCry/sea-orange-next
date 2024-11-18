import { CSSProperties } from 'react';
import { LottieOptions, useLottie } from 'lottie-react';
export const useCreateLottie = (options: LottieOptions<'svg'>, style?: CSSProperties) => {
  const { View } = useLottie(options, style);
  return View;
};
export default useCreateLottie;