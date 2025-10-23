<script lang="ts">
import '../style.css'

import InputBox from '../components/InputBox.svelte'
import OutputBox from '../components/OutputBox.svelte'

let json = $state('')
let outputs = $state([
	{ id: crypto.randomUUID() }
])

const addOutput = () => outputs.push({ id: crypto.randomUUID() })
const removeOutput = (id: string) => outputs = outputs.filter(o => o.id !== id)
</script>

<main class="flex flex-col p-2 gap-2 flex-grow overflow-auto">
	<InputBox bind:json={ json } />

	{#each outputs as output (output.id)}
		<OutputBox { json }>
			{#snippet remove()}
				{#if outputs.length > 1}
					<button
						class="btn btn-xs bg-secondary text-neutral"
						onclick={() => removeOutput(output.id)}
					>X</button>
				{/if}
			{/snippet}
		</OutputBox>
	{/each}

	<button onclick={addOutput} class="btn btn-sm btn-soft btn-accent">+</button>
</main>
