<script lang="ts">
import Fieldset from '@components/Fieldset.svelte'
import JsonEditor from '@components/JsonEditor.svelte';

interface Props {
    json: string
}

let { json = $bindable() }: Props = $props()
</script>

<Fieldset legend="JSON Input">
    <JsonEditor bind:json={ json } />
</Fieldset>
