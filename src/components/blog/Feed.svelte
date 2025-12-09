<script lang="ts">
    import { onMount } from 'svelte';
    import PostCard from './PostCard.svelte';
    import type { Post } from '../../interfaces/Post.ts';

    let posts: Post[] = [];
    let isLoading = true;

    onMount(async () => {
    
        //! hacer fetch
        //suplantar esto
        setTimeout(() => {
            posts = [
                {
                    id: '1',
                    title: '¿Alguien sabe cómo configurar Docker en Railway?',
                    content: 'Estoy intentando subir mi proyecto pero tengo dudas con las variables de entorno...',
                    topic: 'Ayuda',
                    author: { id: '1', username: 'DevJunior' },
                    createdAt: '2025-12-08T10:00:00Z'
                },
                {
                    id: '2',
                    title: 'Mi experiencia usando Astro',
                    content: 'La verdad es que la velocidad es increíble comparada con React puro.',
                    topic: 'Opinión',
                    author: { id: '2', username: 'Admin' },
                    createdAt: '2025-12-09T14:30:00Z'
                }
            ];
            isLoading = false;
        }, 800);
    });
</script>

<div class="max-w-3xl mx-auto">
    {#if isLoading}
        <div class="flex justify-center py-10">
            <span class="loading loading-dots loading-lg"></span>
        </div>
    {:else}
        {#each posts as post (post.id)}
            <PostCard {post} />
        {/each}
        
        {#if posts.length === 0}
            <div class="text-center py-10 opacity-50">No hay publicaciones aún.</div>
        {/if}
    {/if}
</div>