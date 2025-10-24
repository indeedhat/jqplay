<script lang="ts">
import { onMount } from "svelte";
import Prism from "prismjs"
import "prismjs/components/prism-jq"

interface Props {
    query: string
}

let { query = $bindable('') }: Props = $props()
let editor: HTMLElement

const handleInputChange = (): void => {
    query = editor.innerText
    try{
        highlightSyntax()
    } catch {}
}

const highlightSyntax = (): void => {
    if (!editor) {
        return
    }

    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    let cursorPos = 0

    if (range) {
        const preCaret = range.cloneRange()
        preCaret.selectNodeContents(editor)
        preCaret.setEnd(range.endContainer, range.endOffset)
        cursorPos = preCaret.toString().length
    }

    editor.innerHTML = Prism.highlight(query, Prism.languages.jq, "jq")

    restoreCaretPos(cursorPos)
}

const restoreCaretPos = (offset: number): void => {
    const selection = window.getSelection()
    const range = document.createRange()

    let current = 0
    let found = false

    const treeWalker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null)
    while (treeWalker.nextNode()) {
        const next = current + treeWalker.currentNode.textContent!.length

        if (offset <= next) {
            range.setStart(treeWalker.currentNode, offset - current)
            range.collapse(true)
            found = true
            break
        }

        current = next
    }

    if (!found) {
        range.selectNodeContents(editor)
        range.collapse(false)
    }

    selection?.removeAllRanges()
    selection?.addRange(range)
}

onMount(() => {
    try {
        highlightSyntax()
    } catch {}
})
</script>

<code
    class="textarea outline-none w-full whitespace-pre flex-grow"
    bind:this={editor}
    oninput={handleInputChange}
    contenteditable
></code>
