'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
export const serverRevalidatePath = async (path: string) => {
  console.log('serverRevalidatePath', path);
  revalidatePath(path);
};
export const serverRevalidateTag = async (tag: string) => {
  console.log('serverRevalidateTag', tag);
  revalidateTag(tag);
};
