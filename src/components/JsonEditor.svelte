<script lang="ts">
import { onMount } from "svelte";
import Prism from "prismjs"
import "prismjs/components/prism-json"

interface Props {
    json: string
}

let { json = $bindable('') }: Props = $props()
let editor: HTMLElement
let jsonError: string = $state('')

const handleInputChange = (): void => {
    json = editor.innerText
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

    editor.innerHTML = Prism.highlight(json, Prism.languages.json, "json")

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

$effect(async (): void => {
    jsonError = ''

	try {
		if (!json) {
			throw ''
		}
		JSON.parse(json)
	} catch (e: SyntaxError) {
        jsonError = (json || '').replace(/[\r\n\s]/, '')
			? e.message
			: ""
	}
})

onMount(() => {
    try {
        highlightSyntax()
    } catch {}
})
</script>

<code
    class="textarea outline-none w-full flex-grow min-w-0 block whitespace-pre overflow-x-auto overflow-y-auto"
    bind:this={editor}
    oninput={handleInputChange}
    contenteditable
></code>
{#if jsonError}
    <div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        <span>{jsonError}</span>
    </div>
{/if}
