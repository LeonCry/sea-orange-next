import { proxy } from 'valtio';
export const darkStore = proxy<{ isDark: boolean }>({
  isDark: false,
});
