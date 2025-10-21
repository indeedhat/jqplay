<script>
let { json = $bindable() } = $props()
</script>

<style>
textarea {
    width: 100%;
}
</style>

<h2>Json Input</h2>
<textarea bind:value={ json }></textarea>
