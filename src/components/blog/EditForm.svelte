<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';

  export let id: string; 

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';
  let titulo = '';
  let descripcion = '';
  let isSubmitting = false;
  let user: any = null;

  onMount(async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = '/login';
        return;
    }
    user = JSON.parse(userStr);

    try {
        const res = await axios.get(`${API_URL}/posts/${id}`);
        if (res.data.autorId !== user.id) {
            toast.error("No tienes permiso para editar esto.");
            window.location.href = '/publicaciones';
            return;
        }
        titulo = res.data.titulo;
        descripcion = res.data.descripcion;
    } catch (e) {
        console.error(e);
        toast.error('Error al cargar la publicación');
    }
  });

  async function handleUpdate() {
    if (!titulo.trim() || !descripcion.trim()) {
      toast.warning("Los campos no pueden estar vacíos");
      return;
    }

    isSubmitting = true;

    try {
      await axios.put(`${API_URL}/posts/${id}`, {
        titulo,
        descripcion
      }, {
        headers: { 'X-User-Id': user.id }
      });
      
      toast.success('Publicación actualizada correctamente');
      setTimeout(() => window.location.href = `/publicaciones/${id}`, 1000);
      
    } catch (e) {
      console.error(e);
      toast.error('Error al actualizar.');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto mt-12 mb-20 px-4">
  <div class="bg-white p-8 rounded-xl shadow-xl border border-blue-100">
    <h2 class="text-3xl font-black text-blue-900 mb-6 text-center">Editar Publicación</h2>

    <form on:submit|preventDefault={handleUpdate} class="space-y-6">
      <div class="form-control w-full">
        <label class="label"><span class="label-text font-bold text-lg text-gray-700">Título</span></label>
        <input type="text" bind:value={titulo} class="input input-bordered input-lg w-full bg-blue-50 focus:input-primary text-lg" />
      </div>

      <div class="form-control w-full">
        <label class="label"><span class="label-text font-bold text-lg text-gray-700">Contenido</span></label>
        <textarea bind:value={descripcion} class="textarea textarea-bordered h-48 text-lg bg-blue-50 focus:textarea-primary leading-relaxed"></textarea>
      </div>

      <div class="flex gap-4 pt-6">
        <a href={`/publicaciones/${id}`} class="btn btn-ghost btn-lg flex-1 text-gray-500 font-bold hover:bg-gray-100">
            Cancelar
        </a>
     <button type="submit" class="btn btn-primary btn-lg flex-1 shadow-lg font-bold border-none hover:scale-[1.02] transition-transform bg-blue-600
    text-blue-100" 
    disabled={isSubmitting}>
  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
</button>
      </div>
    </form>
  </div>
</div>