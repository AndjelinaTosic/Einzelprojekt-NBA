<script>
  import "../styles.css";
  import Navbar from "$lib/components/Navbar.svelte";
  let { children } = $props();
</script>

<Navbar />

<main class="container py-4">
  {@render children?.()}
</main>
