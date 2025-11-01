<script lang="ts">
import * as jq from 'jq-wasm'

import diff from '@lib/diff'

import Fieldset from "@/components/Fieldset.svelte";
import JsonEditor from "@/components/JsonEditor.svelte";
//import ArrayBlock from './ArrayBlock.svelte';
//import ObjectBlock from './ObjectBlock.svelte';

let a: string = $state('')
let b: string = $state('')
let aError: string = $derived.by(() => {
	try {
		JSON.parse(a)
		return ''
	} catch (e: SyntaxError) {
		return a ? e.message : ''
	}
})
let bError: string = $derived.by(() => {
	try {
		JSON.parse(b)
		return ''
	} catch (e: SyntaxError) {
		return b ? e.message : ''
	}
})
let output: object | any[] | null = $state(null)

$effect(async () => {
	if (!a || !b || aError || bError) {
		return ''
	}

	const aResp = await jq.raw(a, ".", ['-S'])
	const bResp = await jq.raw(b, ".", ['-S'])

	const final = JSON.stringify(diff(
		JSON.parse(aResp.stdout),
		JSON.parse(bResp.stdout)
	), null, 4) ?? ''

	output = JSON.parse(final)
})
</script>

<main class="flex flex-col p-2 gap-2 flex-grow overflow-auto">
	<section class="flex flex-row p-2 gap-2 flex-grow">
		<Fieldset legend="JSON Input" class="flex-col">
			<JsonEditor bind:json={a} />
			{#if aError}
				<div role="alert" class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{aError}</span>
				</div>
			{/if}
		</Fieldset>
		<Fieldset legend="JSON Input" class="flex-col">
			<JsonEditor bind:json={b} />
			{#if bError}
				<div role="alert" class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{bError}</span>
				</div>
			{/if}
		</Fieldset>
	</section>
	<section class="flex flex-row p-2 gap-2 flex-grow">
		<Fieldset legend="JSON Diff" class="flex-grow">
			<code
				class="textarea outline-none w-full overflow-auto whitespace-pre"
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
				{#if a && !aError}
					{#if Array.isArray(output)}
						<ArrayBlock bind:value={output} source={JSON.parse(a || "{}")}/>
					{:else if typeof output === "object"}
						<ObjectBlock bind:value={output} source={JSON.parse(a || "{}")}/>
					{/if}
				{/if}
			</code>
		</Fieldset>
		<Fieldset legend="JSON Diff" class="flex-grow">
			<code
				class="textarea outline-none w-full overflow-auto whitespace-pre"
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
				{#if b && !bError}
					{#if Array.isArray(output)}
						<ArrayBlock bind:value={output} source={JSON.parse(b || "{}")}/>
					{:else if typeof output === "object"}
						<ObjectBlock bind:value={output} source={JSON.parse(b || "{}")}/>
					{/if}
				{/if}
			</code>
		</Fieldset>
	</section>
</main>
