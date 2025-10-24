<script lang="ts">
import Prism from "prismjs"
import "prismjs/components/prism-json"

interface Props {
    json: string
}

let { json = $bindable('') }: Props = $props()
let output: string = $state('')

$effect(() => {
    try {
        output = Prism.highlight(json, Prism.languages.json, "json")
    } catch {}
})
</script>

<code
    class="textarea outline-none w-full whitespace-pre"
    contenteditable
    onbeforeinput={(e) => e.preventDefault()}
    onpaste={(e) => e.preventDefault()}
    onkeydown={(e) => {
        const allowed = (e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "c")
        if (!allowed) {
            e.preventDefault()
        }
    }}
>{@html output}</code>
