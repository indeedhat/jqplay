<script lang="ts">
import '../style.css'

import InputBox from '../components/InputBox.svelte'
import OutputBox from '../components/OutputBox.svelte'

let json = $state('')
let outputCount = $state(1)
</script>

<div class="navbar bg-base-300 min-h-auto">
	JqPlay
</div>

<InputBox bind:json={ json } />

<div class="mx-4 flex justify-between">
	<p class="m-1 font-bold">Output</p>
	<button onclick={() => outputCount += 1} class="btn btn-sm btn-soft btn-accent">+</button>
</div>

<section class="flex flex-col">
	{#each {length: outputCount}, i}
		<OutputBox { json } />
	{/each}
</section>
