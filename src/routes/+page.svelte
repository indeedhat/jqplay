<script lang="ts">
import InputBox from '../components/InputBox.svelte'
import OutputBox from '../components/OutputBox.svelte'

let json = $state('')
let outputCount = $state(1)
</script>

<style>
.output-list {
	display: flex;
	flex-direction: column;
}
</style>

<InputBox bind:json={ json } />

<h2>
	Output
	<button onclick={() => outputCount += 1}>+</button>
</h2>
<section class="output-list">
	{#each {length: outputCount}, i}
		<OutputBox { json } />
	{/each}
</section>
