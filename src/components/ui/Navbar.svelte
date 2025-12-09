<script>
  import { onMount } from 'svelte';

  let isLoggedIn = false;
  let username = '';

  onMount(() => {
    const user = localStorage.getItem('user'); 
    if (user) {
      isLoggedIn = true;
      username = JSON.parse(user).username;
    }
  });

  function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
</script>

<div class="navbar bg-base-100 shadow-md mb-8">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Mi Blog</a>
  </div>
  <div class="flex-none gap-2">
    <a href="/publicaciones" class="btn btn-ghost btn-sm">Ver Publicaciones</a>

    {#if isLoggedIn}
      <span class="text-sm font-bold mr-2 hidden sm:inline">Hola, {username}</span>
      <a href="/crear" class="btn btn-primary btn-sm">Publicar</a>
      <button on:click={logout} class="btn btn-outline btn-error btn-sm">Salir</button>
    {:else}
      <a href="/login" class="btn btn-ghost btn-sm">Ingresar</a>
      <a href="/registro" class="btn btn-neutral btn-sm">Registrarse</a>
    {/if}
  </div>
</div>