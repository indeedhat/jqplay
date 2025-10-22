<script>
let { json = $bindable() } = $props()
</script>

<style>
textarea {
    width: 100%;
}
</style>

<div class="card bg-neutral p-2 m-2">
    <h2 class="card-title">JSON Input</h2>
    <textarea bind:value={ json } class="textarea"></textarea>
</div>
