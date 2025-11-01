<script lang="ts">
import Literal from "./Literal.svelte"
import JSONObject from "./Object.svelte"
import JSONArray from "./Array.svelte"
import Indent from "./Indent.svelte"

interface Props {
	value: object
	indent?: number
}

let { value, indent = 0 }: Props = $props()
let open: boolean = $state(true)

const entries = Object.entries(value)

indent += 2

const toggle = () => {
	open = !open
}
</script>

<style scoped>
.showhide {
	cursor: pointer;
}
.showhide.closed::after {
	content: attr(data-len);
}

.token.punctuation:hover,
.token.punctuation:hover ~ .token.punctuation {
	color: red;
}
</style>

<span class={{"token punctuation showhide": true, closed: !open}} onclick={toggle} data-len={entries.length}>{'{'}</span><!--
-->{#if open}<!--
	-->{#each entries as [k, v], i (i)}<!--
		--><div>
			<Indent n={indent} /><span class="token property">"{k}"</span><span class="token operator">:</span>
			{#if Array.isArray(v)}<!--
			--><JSONArray value={v} indent={indent} /><!--
		-->{:else if typeof v === "object"}<!--
			--><JSONObject value={v} indent={indent} /><!--
		-->{:else}
				<Literal value={v} /><!--
		-->{/if}<!--
		-->{#if i < (entries?.length - 1)}<!--
				--><span class="token punctuation">,</span><!--
		-->{/if}
		</div><!--
	-->{/each}<!--
-->{/if}<!--
--><Indent n={open ? indent-2 : 0} /><span class="token punctuation showhide" onclick={toggle}>{'}'}</span>
