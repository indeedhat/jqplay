<script lang="ts">
import Literal from "./Literal.svelte"

let { value }: { value: object } = $props()
</script>

<span class="token punctuation">{'{'}</span>
<div class="w-[4ch]">
	{#each Object.entries(value) as [k, v]}
		<div>
			<span class="token property">{k}</span><span class="token punctuation">:</span>
			{#if Array.isArray(v)}
				<Arra
			{#elseif typeof v === "object"}
			{#else}
				<Literal value={v} />
			{/if}
		</div>
	{/each}
</div>
<span class="token punctuation">{'}'}</span>
