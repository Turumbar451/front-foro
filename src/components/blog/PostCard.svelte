<script lang="ts">
    import type { Post } from '../../interfaces/Post'; 

    export let post: Post;
    
    function formatearFecha(fecha: string) {
        if (!fecha) return '';
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }
</script>

<div class="card w-full bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 mb-6 rounded-xl group">
    <div class="card-body p-6">
        
        <div class="flex flex-col gap-1 mb-3">
            <h3 class="card-title text-3xl font-extrabold text-gray-800 group-hover:text-blue-700 transition-colors leading-tight">
                <a href={`/publicaciones/${post.id}`} class="hover:underline decoration-2 underline-offset-4">
                    {post.titulo}
                </a>
            </h3>
            
            <div class="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <span class="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {post.nombreAutor || 'Anónimo'}
                </span>
                <span>•</span>
                <span>{formatearFecha(post.fechaCreacion)}</span>
            </div>
        </div>
        
        <p class="text-gray-600 text-lg leading-relaxed line-clamp-2">
            {post.descripcion}
        </p>
        
        <div class="card-actions justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span class="font-medium">{post.likes} Likes</span>
            </div>

            <a href={`/publicaciones/${post.id}`} class="btn btn-sm btn-ghost text-blue-700 hover:bg-blue-50">
                Leer conversación →
            </a>
        </div>
    </div>
</div>