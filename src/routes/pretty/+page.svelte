<script lang="ts">
import * as jq from 'jq-wasm'

import Fieldset from "@/components/Fieldset.svelte";
import JsonEditor from "@/components/JsonEditor.svelte";
import JsonPrinter from "@/components/JsonPrinter.svelte";

let input: string = $state('')
let output: string = $state('')
let sort: bool = $state(false)

$effect(async (): void => {
	try {
		JSON.parse(input)
		const resp = await jq.raw(input, ".", sort ? ["-S"] : undefined)
		output = resp.stdout
	} catch (e: SyntaxError) {
		output = input
			? e.message
			: ""
	}
})
</script>

<main class="flex flex-row p-2 gap-2 flex-grow overflow-auto">
	<Fieldset legend="Input">
		<JsonEditor bind:json={input} />
	</Fieldset>
	<Fieldset legend="output" class="relative">
		<div class="badge badge-xl badge-outline badge-accent absolute right-4 top-4 p-4">
			<label class="label">
				<input type="checkbox" bind:checked={sort} class="checkbox checkbox-accent checkbox-sm" />
				Sort Keys
			</label>
		</div>
		<JsonPrinter bind:json={output} />
	</Fieldset>
</main>
