import { Saira, Noto_Sans_SC, Roboto_Mono, Chakra_Petch } from 'next/font/google';
const baseEN = Roboto_Mono({ subsets: ['latin'], variable: '--font-baseEN' });
const baseZN = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-baseZN' });
const stiffEN = Saira({ subsets: ['latin'] });
const chakraEN = Chakra_Petch({ subsets: ['latin'], weight: "600" });
export { baseEN, baseZN, stiffEN, chakraEN };