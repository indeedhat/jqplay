<script lang="ts">
export const prerender = true;

import { page } from '$app/state'

import '@/style.css'
import "prismjs/themes/prism-tomorrow.css"
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();

const active = (path: string) => {
	return page.url.pathname === path
		? "menu-active"
		: ""
}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="h-screen flex flex-col">
	<header class="navbar bg-base-300 min-h-auto text-2xl">
		<div class="navbar-start">
			<a href="/">JSON Playground</a>
		</div>
		<div class="navbar-center">
			<ul class="menu menu-horizontal bg-base-200 rounded-box">
				<!--
				<li class="menu-disabled"><a>Convert</a></li>
				<li><a href="/diff" class={active("/diff")}>Diff</a></li>
				<li class="menu-disabled"><a>Explorer</a></li>
				-->
				<li><a href="/jq" class={active("/jq")}>Jq</a></li>
				<li><a href="/pretty" class={active("/pretty")||active("/")}>Pretty</a></li>
			</ul>
		</div>
		<div class="navbar-end">
			<div class="alert">More tools coming soon</div>
		</div>
	</header>

	{@render children?.()}
</div>
