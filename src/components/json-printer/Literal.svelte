<script lang="ts">
interface Props {
	value: any
}

let { value }: Props = $props()

const type = typeof value
</script>

{#if type === "string"}
	<span class="token string">"{value}"</span>
{:else}
	<span class={`token ${type}`}>{value}</span>
{/if}
