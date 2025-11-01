<script lang="ts">
import * as jq from 'jq-wasm'

import Fieldset from "@/components/Fieldset.svelte";
import JsonEditor from "@/components/JsonEditor.svelte";
import JsonPrinter from "@/components/JsonPrinter.svelte";

let input: string = $state('')
let output: string = $state('')
let sort: bool = $state(false)

$effect(async (): void => {
	const resp = await jq.raw(input, ".", sort ? ["-S"] : undefined)
	output = resp.stdout
})
</script>

<main class="flex flex-row p-2 gap-2 flex-grow overflow-auto">
	<Fieldset legend="Input" class="flex-col flex-grow w-[50%]">
		<JsonEditor bind:json={input} />
	</Fieldset>
	<Fieldset legend="output" class="relative flex-grow w-[50%]">
		<div class="badge badge-xl badge-outline badge-accent absolute right-6 top-5 p-4">
			<label class="label">
				<input type="checkbox" bind:checked={sort} class="checkbox checkbox-accent checkbox-sm" />
				Sort Keys
			</label>
		</div>
		<JsonPrinter bind:json={output} />
	</Fieldset>
</main>
