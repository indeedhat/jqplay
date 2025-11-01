<script lang="ts">
import type { Snippet } from 'svelte';
import * as jq from 'jq-wasm'

import Fieldset from '@components/Fieldset.svelte'
import JqOutputPrinter from '@components/JqOutputPrinter.svelte';
import JqEditor from '@components/JqEditor.svelte';

interface Props {
	json: string
	remove?: Snippet
}

let { json, remove }: Props = $props()

let query = $state('')
let flag = $state('')
let output = $state('')

const isJson = (input: string) => {
	try {
		JSON.parse(input)
		return true
	} catch {}

	return false
}

$effect(async (): void => {
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
			<JqEditor bind:query={query} />
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

		<JqOutputPrinter bind:json={output} />
	</div>
</Fieldset>


