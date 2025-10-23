<script lang="ts">
import type { Snippet } from 'svelte';

import * as jq from 'jq-wasm'

import Fieldset from './Fieldset.svelte'

interface Props {
	json: string
	remove?: Snippet
}

let { json, remove }: Props = $props()

let query = $state('')
let flag = $state('')
let output = $state('')

$effect(async () => {
	if (!json || !query) {
		return
	}

	const res = await jq.raw(json, query, flag ? [flag] : undefined)
	output = res.stdout
})
</script>

<Fieldset class="flex-grow">
	{#snippet legend()}
		<div class="w-full flex justify-between">
			<span>Output</span>
			{#if remove}
				{@render remove()}
			{/if}
		</div>
	{/snippet}
	<div  class="flex flex-row gap-2 w-full h-full">
		<div class="flex flex-col w-1/3 gap-2 h-full">
			<textarea
				bind:value={ query }
				class="textarea outline-none flex-grow resize-none w-full"
				placeholder="Query..."
			></textarea>
			<select bind:value={ flag } class="select outline-none w-full">
				<option value="">Choose a flag</option>
				<option value="-c">-c (Compact output)</option>
				<option value="-n">-n (Null input)</option>
				<option value="-R">-c (Raw input)</option>
				<option value="-r">-r (Raw output)</option>
				<option value="-s">-s (Slurp: read into array)</option>
				<option value="-S">-S (Sort keys)</option>
			</select>
		</div>

		<textarea class="textarea flex-grow cursor-text h-full resize-none outline-none" bind:value={ output } readonly></textarea>
	</div>
</Fieldset>


