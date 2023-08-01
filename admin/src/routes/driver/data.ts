import { page } from "$app/stores";
import { get, writable } from "svelte/store";
import type { LayoutData } from "./$types";

const data = get(page).data as LayoutData

export const manifests = writable(
  Object.fromEntries(
    data.manifest.map( e => [e.manifest_id, false] )
  )
)
