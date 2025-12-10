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

<nav class="bg-blue-50 border-b border-blue-200 h-24 flex items-center shadow-sm">
  <div class="container mx-auto px-6 flex justify-between items-center w-full">

    <a href="/" class="text-3xl font-black text-blue-900 hover:opacity-80 decoration-none">
      🎓 Blog Escolar
    </a>

    <div class="flex items-center gap-6">
      <a href="/publicaciones" class="text-xl font-bold text-blue-800 hover:text-blue-600 hover:underline">
        Muro Público
      </a>

      {#if isLoggedIn}
        <div class="h-8 w-0.5 bg-blue-300 mx-2"></div> <span class="text-lg font-medium text-blue-900">Hola, {username}</span>
        
        <a href="/crear" class="btn btn-primary text-white text-lg font-bold border-none shadow-md px-6">
          + Publicar
        </a>
        
        <button on:click={logout} class="btn btn-ghost text-red-500 text-lg font-bold hover:bg-red-50">
          Salir
        </button>
      {:else}
        <div class="h-8 w-0.5 bg-blue-300 mx-2"></div>

        <a href="/login" class="text-xl font-bold text-blue-800 hover:text-blue-600">
          Ingresar
        </a>
        <a href="/registro" class="btn btn-primary text-white text-lg font-bold border-none shadow-md px-6">
          Registrarse
        </a>
      {/if}
    </div>

  </div>
</nav>