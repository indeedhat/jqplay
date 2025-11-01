<script lang="ts">
interface Props {
    n: number
}

let { n }: Props = $props()
</script>
{@html " ".repeat(n)}
