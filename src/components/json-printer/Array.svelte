<script lang="ts">
import Literal from "./Literal.svelte"
import JSONObject from "./Object.svelte"
import JSONArray from "./Array.svelte"
import Indent from "./Indent.svelte"

interface Props {
	value: any[]
	indent?: number
}

let { value, indent = 0 }: Props = $props()
let open: boolean = $state(true)

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

<span class={{"token punctuation showhide": true, closed: !open}} onclick={toggle} data-len={value.length}>{'['}</span><!--
-->{#if open}<!--
	-->{#each value as v, i (i)}<!--
		--><div>
			{#if Array.isArray(v)}<!--
			--><Indent n={indent} /><JSONArray value={v} indent={indent} /><!--
		-->{:else if typeof v === "object"}<!--
			--><Indent n={indent} /><JSONObject value={v} indent={indent} /><!--
		-->{:else}<!--
			--><Indent n={indent} /><Literal value={v} /><!--
		-->{/if}<!--
		-->{#if i < (value?.length - 1)}<!--
				--><span class="token punctuation">,</span><!--
		-->{/if}
		</div><!--
	-->{/each}<!--
-->{/if}<!--
--><Indent n={open ? indent-2 : 0} /><span class="token punctuation showhide" onclick={toggle}>{']'}</span>
