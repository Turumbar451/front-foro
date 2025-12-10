<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
    import type { Comment } from '../../interfaces/Comment';

    export let postId: string; // recibir el id de la publicación padre

    const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';
    
    let comments: Comment[] = [];
    let newCommentText = '';
    let loading = true;
    let user: any = null;
    let isSubmitting = false;

    // cargar comentarios al iniciar
    onMount(async () => {
        const userStr = localStorage.getItem('user');
        if (userStr) user = JSON.parse(userStr);
        await loadComments();
    });

    async function loadComments() {
        try {
            const res = await axios.get(`${API_URL}/comments/post/${postId}`);
            comments = res.data;
        } catch (e) {
            console.error("Error cargando comentarios", e);
        } finally {
            loading = false;
        }
    }

    async function handleSubmit() {
        if (!newCommentText.trim()) return;
        if (!user) {
            alert("Debes iniciar sesión para comentar");
            window.location.href = '/login';
            return;
        }

        isSubmitting = true;
        
        const payload = {
            contenido: newCommentText, 
            postId: postId,
            autorId: user.id
        };

        try {
            await axios.post(`${API_URL}/comments`, payload);
            newCommentText = ''; // limpiar input
            await loadComments(); // recargar lista
        } catch (e) {
            alert("Error al enviar comentario. Revisa la consola.");
            console.error(e);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="mt-12 border-t pt-8">
    <h3 class="text-2xl font-bold mb-6">Comentarios ({comments.length})</h3>

    <div class="flex gap-4 mb-10">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-10 h-10">
                <span>{user ? user.username[0].toUpperCase() : '?'}</span>
            </div>
        </div>
        <form on:submit|preventDefault={handleSubmit} class="flex-grow">
            <textarea 
                bind:value={newCommentText}
                class="textarea textarea-bordered w-full h-24 focus:textarea-primary" 
                placeholder={user ? "Escribe tu opinión..." : "Inicia sesión para comentar"}
                disabled={!user || isSubmitting}
            ></textarea>
            <div class="flex justify-end mt-2">
                <button 
                    type="submit" 
                    class="btn btn-primary btn-sm"
                    disabled={!user || isSubmitting || !newCommentText.trim()}
                >
                    {#if isSubmitting}
                        <span class="loading loading-spinner"></span>
                    {:else}
                        Comentar
                    {/if}
                </button>
            </div>
        </form>
    </div>

    {#if loading}
        <div class="text-center py-4">Cargando comentarios...</div>
    {:else if comments.length === 0}
        <div class="text-center text-gray-500 py-4 italic">No hay comentarios aún. ¡Sé el primero!</div>
    {:else}
        <div class="flex flex-col gap-6">
            {#each comments as comment}
                <div class="flex gap-3">
                    <div class="avatar placeholder">
                        <div class="bg-base-300 text-base-content rounded-full w-8 h-8">
                            <span class="text-xs">{comment.nombreAutor ? comment.nombreAutor[0] : 'A'}</span>
                        </div>
                    </div>
                    <div class="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 flex-grow">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-sm">{comment.nombreAutor || 'Anónimo'}</span>
                            <span class="text-xs text-gray-400">{new Date(comment.fechaCreacion).toLocaleDateString()}</span>
                        </div>
                        <p class="text-sm text-gray-700 whitespace-pre-line">{comment.contenido}</p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>