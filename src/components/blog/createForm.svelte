<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';

  let titulo = '';
  let descripcion = '';
  let error = '';
  let isSubmitting = false;
  let user: any = null;

  onMount(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      window.location.href = '/login';
    } else {
      user = JSON.parse(userStr);
    }
  });

  async function handleSubmit() {
    if (!titulo.trim() || !descripcion.trim()) {
      error = "El título y la descripción son obligatorios.";
      return;
    }

    isSubmitting = true;
    error = '';

    const payload = {
      titulo: titulo,
      descripcion: descripcion,
      autorId: user.id
    };

    try {
      await axios.post(`${API_URL}/posts`, payload);
      window.location.href = '/publicaciones';
    } catch (e) {
      console.error(e);
      error = 'Error al conectar con el servidor. Revisa que el backend esté corriendo.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto mt-10 px-4">
  <div class="bg-base-100 p-8 rounded-xl shadow-xl border border-base-200">
    <h2 class="text-3xl font-bold text-center mb-6 text-primary">Crear Nueva Publicación</h2>

    {#if error}
      <div class="alert alert-error mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      
      <div class="form-control w-full">
        <label class="label" for="titulo">
          <span class="label-text font-semibold text-lg">Título</span>
        </label>
        <input 
          id="titulo"
          type="text" 
          bind:value={titulo} 
          placeholder="Ej: ¿Cómo centro un div en CSS?" 
          class="input input-bordered w-full input-lg focus:input-primary" 
          required 
        />
      </div>

      <div class="form-control w-full">
        <label class="label" for="descripcion">
          <span class="label-text font-semibold text-lg">Contenido</span>
        </label>
        <textarea 
          id="descripcion"
          bind:value={descripcion} 
          class="textarea textarea-bordered h-48 text-base focus:textarea-primary" 
          placeholder="Escribe aquí los detalles de tu publicación..." 
          required
        ></textarea>
      </div>

      <button 
        type="submit" 
        class="btn btn-primary w-full btn-lg shadow-md hover:shadow-xl transition-all" 
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <span class="loading loading-spinner"></span> Publicando...
        {:else}
          Publicar Post
        {/if}
      </button>

    </form>
  </div>
</div>