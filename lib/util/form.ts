export function formSerialize(form: HTMLFormElement) {
  const data = new FormData(form);
  return new URLSearchParams(data as any).toString();
}

export function formDeserialize(form: HTMLFormElement, data: any) {
  const entries = (new URLSearchParams(data)).entries();
  for(const [key, val] of entries) {
    const input = form.elements[key as any] as any;
    switch(input.type) {
        case 'checkbox': input.checked = !!val; break;
        default:         input.value = val;     break;
    }
  }
}