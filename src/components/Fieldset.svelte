<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
    legend?: string | Snippet
    class?: string
    children: Snippet
}

let {
    class: klass,
    legend,
    children,
}: Props = $props();
</script>

<style>
legend {
    padding-block: 0
}
</style>

<fieldset class={[`fieldset bg-base-200 border-base-300 rounded-box border p-2 w-full flex`, klass]}>
    {#if legend}
        <legend class="fieldset-legend px-2 w-full">
            {#if typeof legend === "function"}
                {@render legend()}
            {:else}
                {legend}
            {/if}
        </legend>
    {/if}
    {@render children?.()}
</fieldset>
