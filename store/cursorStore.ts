import { proxy, ref } from 'valtio';
interface cursorType {
  cursorElement: any;
  targetElement: HTMLElement | null;
}
export const cursorStore = proxy<cursorType>({
  cursorElement: ref({}),
  targetElement: null,
});