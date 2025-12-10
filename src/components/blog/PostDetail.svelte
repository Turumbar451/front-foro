<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { toast } from "svelte-sonner";
    import CommentsSection from "./CommentsSection.svelte";
    import type { Post } from "../../interfaces/Post";

    export let id: string;

    const API_URL =
        import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api";
    let post: Post | null = null;
    let loading = true;
    let error = "";
    let user: any = null;
    let yaDioLike = false; // para cambiar el boton de color
    let esDueño = false;

    onMount(async () => {
        const userStr = localStorage.getItem("user");
        if (userStr) user = JSON.parse(userStr);

        try {
            const res = await axios.get(`${API_URL}/posts/${id}`);
            post = res.data;

            // si el id del usuario esta en la lista de likes
            if (post && user && post.usuariosQueDieronLike) {
                yaDioLike = post.usuariosQueDieronLike.includes(user.id);
            }

            // Puede editar si es el dueño O si es admin
            if (
                user &&
                post &&
                (user.id === post.autorId || user.role === "Admin")
            ) {
                esDueño = true;
            }
        } catch (e) {
            error = "No se pudo cargar la publicación.";
        } finally {
            loading = false;
        }
    });

    async function darLike() {
        if (!user) {
            toast.error("Debes iniciar sesión", {
                description: "Regístrate para participar en la comunidad.",
                action: {
                    label: "Ir a Login",
                    onClick: () => (window.location.href = "/login"),
                },
            });
            return;
        }

        try {
            //llamada a la api para dar like
            const res = await axios.post(
                `${API_URL}/posts/${id}/like`,
                {},
                {
                    headers: { "X-User-Id": user.id },
                },
            );

            //actualizar el post con la respuesta
            post = res.data;

            // actualizar el estado del like
            if (post && post.usuariosQueDieronLike) {
                const nuevoEstado = post.usuariosQueDieronLike.includes(
                    user.id,
                );

                if (nuevoEstado && !yaDioLike) {
                    toast.success("¡Te gusta esto!");
                } else if (!nuevoEstado && yaDioLike) {
                    toast.info("Like eliminado.");
                }
                yaDioLike = nuevoEstado;
            }
        } catch (e) {
            console.error("Error like", e);
            toast.error("Error al procesar el like.");
        }
    }

    async function eliminarPost() {
        if (
            !confirm(
                "¿Estás seguro de que quieres eliminar esta publicación? No se puede deshacer.",
            )
        ) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/posts/${id}`, {
                headers: { "X-User-Id": user.id },
            });

            toast.success("Publicación eliminada correctamente");

            setTimeout(() => {
                window.location.href = "/publicaciones";
            }, 1000);
        } catch (e) {
            toast.error("Error al eliminar", {
                description: "Tal vez no tienes permisos o el servidor falló.",
            });
            console.error(e);
        }
    }
</script>

<div class="max-w-3xl mx-auto py-10 px-4">
    {#if loading}
        <div class="flex justify-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"
            ></span>
        </div>
    {:else if error}
        <div class="alert alert-error shadow-lg">{error}</div>
        <a href="/publicaciones" class="btn btn-outline mt-4">Volver</a>
    {:else if post}
        <div class="prose max-w-none">
            <div class="flex justify-between items-start mb-6">
                <h1
                    class="text-4xl md:text-5xl font-extrabold text-blue-900 m-0 leading-tight"
                >
                    {post.titulo}
                </h1>

                {#if esDueño}
                    <div class="flex gap-3">
                        <a
                            href={`/publicaciones/editar/${post.id}`}
                            class="btn btn-neutral btn-sm shadow-sm gap-2 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                /></svg
                            >
                            Editar
                        </a>

                        <button
                            on:click={eliminarPost}
                            class="btn btn-error btn-outline btn-sm shadow-sm gap-2 hover:bg-red-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                /></svg
                            >
                            Borrar
                        </button>
                    </div>
                {/if}
            </div>

            <div
                class="flex items-center gap-3 text-sm text-gray-500 mb-8 border-b border-blue-100 pb-6"
            >
                <div class="avatar placeholder">
                    <div
                        class="bg-blue-100 text-blue-800 rounded-full w-10 ring-2 ring-white"
                    >
                        <span class="text-lg font-bold"
                            >{post.nombreAutor
                                ? post.nombreAutor[0].toUpperCase()
                                : "A"}</span
                        >
                    </div>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-gray-800"
                        >{post.nombreAutor || "Anónimo"}</span
                    >
                    <span class="text-xs"
                        >{new Date(
                            post.fechaCreacion,
                        ).toLocaleDateString()}</span
                    >
                </div>
            </div>

            <div
                class="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 min-h-[200px] text-lg leading-relaxed text-gray-700"
            >
                <p class="whitespace-pre-line">{post.descripcion}</p>
            </div>

            <div class="mt-8 flex justify-between items-center mb-12">
                <a
                    href="/publicaciones"
                    class="btn btn-ghost gap-2 hover:bg-blue-50 text-blue-700"
                >
                    ← Volver al muro
                </a>

                <button
                    on:click={darLike}
                    class="btn gap-2 transition-all {yaDioLike
                        ? 'btn-error text-red-500 shadow-md'
                        : 'btn-ghost border-blue-200'}"
                >
                    {#if yaDioLike}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            ></path></svg
                        >
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            ></path></svg
                        >
                    {/if}
                    <span class="font-boldtext-lg">{post.likes} Likes</span>
                </button>
            </div>

            <CommentsSection postId={id} />
        </div>
    {/if}
</div>
