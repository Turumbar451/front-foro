<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
    import PostCard from './PostCard.svelte';
    import type { Post } from '../../interfaces/Post';

    const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';
    
    let posts: Post[] = [];
    let isLoading = true;
    let error = '';
    let busqueda = ''; // el texto del buscador

    onMount(async () => {
        await cargarPosts();
    });

    async function cargarPosts() {
        isLoading = true;
        error = '';
        try {
            let url = `${API_URL}/posts`;
            
            //logica de busqueda
            if (busqueda.trim()) {
                url = `${API_URL}/posts/buscar?titulo=${encodeURIComponent(busqueda)}`;
            }

            const response = await axios.get(url);
            posts = response.data;
        } catch (e) {
            console.error("Error cargando posts:", e);
            error = "No se pudieron cargar las publicaciones. Verifica el servidor Java.";
        } finally {
            isLoading = false;
        }
    }

    // iniciar busqueda
    function handleSearch() {
        cargarPosts();
    }
</script>

<div class="max-w-4xl mx-auto">
    
    <div class="join w-full mb-8 shadow-md rounded-xl overflow-hidden">
        <input 
            type="text" 
            bind:value={busqueda} 
            on:keydown={(e) => e.key === 'Enter' && handleSearch()}
            class="input input-bordered join-item w-full input-lg bg-white focus:input-primary text-lg" 
            placeholder="Buscar por título en el foro..." 
        />
        <button on:click={handleSearch} class="btn btn-primary join-item btn-lg text-white font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
    </div>

    {#if isLoading}
        <div class="flex justify-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
    {:else if error}
        <div class="alert alert-error shadow-lg">{error}</div>
    {:else if posts.length === 0}
        <div class="text-center py-10 bg-blue-50 rounded-xl border border-blue-100">
            <h3 class="text-xl font-bold text-blue-900">
                {busqueda.trim() ? `No se encontraron resultados para "${busqueda}"` : '¡Está muy vacío aquí!'}
            </h3>
            {#if busqueda.trim()}
                <button on:click={() => {busqueda=''; cargarPosts()}} class="btn btn-link mt-2 text-lg">Ver todas las publicaciones</button>
            {:else}
                <p class="py-2 text-lg text-gray-500">Sé la primera persona en publicar algo.</p>
                <a href="/crear" class="btn btn-primary btn-md mt-4 shadow-lg">Crear Post</a>
            {/if}
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            {#each posts as post (post.id)}
                <PostCard {post} />
            {/each}
        </div>
    {/if}
</div>