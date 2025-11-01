<script lang="ts">
import JSONObject from "./Object.svelte"
import JSONArray from "./Array.svelte"

interface Props {
    json: string
}

let { json = $bindable('') }: Props = $props()
let output: object | null = $state(null)

const deferParse = (data: string) => {
    setTimeout(() => {
        try {
            output = JSON.parse(data)
        } catch {}
    }, 0)
}

$effect(() => {
    output = null
    deferParse(json)
})
</script>

<code
    class="textarea outline-none w-full whitespace-pre overflow-auto flex-grow"
    contenteditable
    onbeforeinput={(e) => e.preventDefault()}
    onpaste={(e) => e.preventDefault()}
    onkeydown={(e) => {
        const allowed = (e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "c")
        if (!allowed) {
            e.preventDefault()
        }
    }}
>
    {#if Array.isArray(output)}
        <JSONArray value={output} />
    {:else if output}
        <JSONObject value={output} />
    {/if}
</code>
