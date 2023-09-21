import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_URL} from '$env/static/public'
import { writable } from 'svelte/store';
export function createInstance() {
  return new PocketBase(PUBLIC_POCKETBASE_URL)
}

export const pb = createInstance()