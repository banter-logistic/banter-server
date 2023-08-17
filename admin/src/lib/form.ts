import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import { input_element } from "lib/const";
import type { ActionResult } from "@sveltejs/kit";
import type { ActionReturn } from "svelte/action";


export function cross(elem: HTMLFormElement, prop = {}): ActionReturn {
  elem.addEventListener('submit', async function(e) {
    e.preventDefault()
    
    const inputs = elem.querySelectorAll(input_element.join(', '))
    
    const data = new FormData(this);
    
    const promise = fetch(this.action, {
      method: 'POST',
      body: data,
    });
    
    inputs.forEach( e => (e as any).disabled = true)
    
    const response = await promise
  
    const result: ActionResult = deserialize(await response.text());
    
    inputs.forEach( e => (e as any).disabled = false)
    
    if (result.type === 'success') {
      await invalidateAll();
      elem.reset()
    } else if (result.type === 'redirect') {
      
    } else if (result.type === 'failure') {
      elem.querySelectorAll('[data-cross-reset]').forEach( e => (e as any).value = '')
    }
  
    applyAction(result);
  })

  return {};
}