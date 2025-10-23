<script>
import Fieldset from './Fieldset.svelte'

let { json = $bindable() } = $props()
</script>

<Fieldset legend="JSON Input">
    <textarea bind:value={ json } class="textarea outline-none w-full"></textarea>
</Fieldset>
