<script>
import * as jq from 'jq-wasm'

let { json } = $props()

let query = $state('')
let flag = $state('')
let output = $state('')

$effect(async () => {
	console.log(json, query)
	if (!json || !query) {
		return
	}

	console.log({ json, query, flag})
	const res = await jq.raw(json, query, flag ? [flag] : undefined)
	output = res.stdout
})
</script>

<style>
section.box {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	gap: 4px;
}

.controls {
	width: 33%;
	display: flex;
	flex-direction: column;
	gap: 4px;
}
</style>

<section class="card bg-neutral p-2 m-2 flex flex-row  gap-2">
	<div class="flex flex-col w-1/3 gap-2">
		<textarea bind:value={ query } class="textarea" placeholder="Query..."></textarea>
		<select bind:value={ flag } class="select">
			<option value="">Choose a flag</option>
			<option value="-c">-c (Compact output)</option>
			<option value="-n">-n (Null input)</option>
			<option value="-R">-c (Raw input)</option>
			<option value="-r">-r (Raw output)</option>
			<option value="-s">-s (Slurp: read into array)</option>
			<option value="-S">-S (Sort keys)</option>
		</select>
	</div>

	<textarea class="textarea flex-grow" disabled bind:value={ output }></textarea>
</section>


