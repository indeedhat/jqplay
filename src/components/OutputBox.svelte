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
	const res = await jq.json(json, query, flag ? [flag] : [])
	if (typeof res === "object") {
		output = JSON.stringify(res, null, 4)
	} else {
		output = String(res)
	}
})
</script>

<style>
section.box {
	display: flex;
	flex-direction: row;
	border: 1px solid black;
	margin: 4px 8px;
	padding: 4px;
	border-radius: 4px;
	flex-grow: 1;
}

.controls {
	width: 33%;
	display: flex;
	flex-direction: column;
}

section.output {
	margin-left: 4px;
	border: 1px solid #ccc;
	white-space: pre;
	overflow: auto;
	flex-grow: 1;
}

</style>

<section class="box">
	<div class="controls">
		<textarea bind:value={ query }></textarea>
		<select bind:value={ flag }>
			<option value="">Choose a flag</option>
			<option value="-c">-c (Compact output)</option>
			<option value="-n">-n (Null input)</option>
			<option value="-R">-c (Raw input)</option>
			<option value="-r">-r (Raw output)</option>
			<option value="-s">-s (Slurp: read into array)</option>
			<option value="-S">-S (Sort keys)</option>
		</select>
	</div>

	<section class="output">{ output }</section>
</section>


