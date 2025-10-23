<script lang="ts">
export const prerender = true;

import favicon from '$lib/assets/favicon.svg';

let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="h-screen flex flex-col">
	<header class="navbar bg-base-300 min-h-auto text-2xl">
		<div class="navbar-start">
			JSON Playground
		</div>
		<div class="navbar-center">
			<ul class="menu menu-horizontal bg-base-200 rounded-box">
			  <li><a>Convert</a></li>
			  <li><a>Diff</a></li>
			  <li><a>Explorer</a></li>
			  <li><a>Jq</a></li>
			</ul>
		</div>
		<div class="navbar-end"></div>
	</header>

	{@render children?.()}
</div>
