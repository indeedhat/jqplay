<script lang="ts">
import Fieldset from './Fieldset.svelte'
import JsonEditor from './JsonEditor.svelte';

interface Props {
    json: string
}

let { json = $bindable() }: Props = $props()
</script>

<Fieldset legend="JSON Input">
    <JsonEditor bind:json={ json } />
</Fieldset>
