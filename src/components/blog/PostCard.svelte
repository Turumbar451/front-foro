<script lang="ts">
    import type { Post } from '../../interfaces/Post.ts';

    export let post: Post;
</script>

<div class="card w-full bg-base-100 shadow-md mb-4 hover:bg-base-200 transition-colors">
    <div class="card-body p-6">
        <div class="flex justify-between items-start mb-2">
            <h3 class="card-title text-xl font-bold">{post.title}</h3>
            <div class="badge badge-neutral">{post.topic}</div>
        </div>
        
        <p class="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
        
        <div class="flex justify-between items-center text-xs text-gray-500 border-t pt-3 border-base-300">
            <div class="flex gap-2 items-center">
                <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-6">
                        <span>{post.author.username[0].toUpperCase()}</span>
                    </div>
                </div>
                <span class="font-semibold">{post.author.username}</span>
            </div>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
    </div>
</div>