

/** @type {import('./$types').LayoutLoad} */
export async function load({params}) {
    return{id:params.id ?? "tracking"}
}