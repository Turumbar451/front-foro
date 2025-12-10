<script lang="ts">
  import axios from 'axios';

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';
  let username = '';
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  async function handleRegister() {
    isLoading = true;
    error = '';
    
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });

      const userData = {
        id: res.data.userId,
        role: res.data.role,
        username: username
      };
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = '/publicaciones';
      
    } catch (e) {
      console.error(e);
      error = 'Error al registrarse. Verifica los datos.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="card w-full max-w-md bg-white shadow-xl border border-blue-100 mx-auto">
  <div class="card-body p-8">
    
    <div class="text-center mb-6">
      <h2 class="text-3xl font-black text-blue-900 mb-2">Crear Cuenta</h2>
      <p class="text-gray-500 text-lg">Únete a la comunidad universitaria</p>
    </div>

    {#if error} <div class="alert alert-error text-white shadow-md mb-4">{error}</div> {/if}

    <form on:submit|preventDefault={handleRegister} class="flex flex-col gap-5">
        
        <div class="form-control">
            <label class="label" for="reg-user">
              <span class="label-text text-lg font-bold text-gray-700">Nombre de Usuario</span>
            </label>
            <input id="reg-user" type="text" bind:value={username} placeholder="Ej: JuanPerez" class="input input-bordered input-lg w-full bg-gray-50 text-lg" required />
        </div>
        
        <div class="form-control">
            <label class="label" for="reg-email">
              <span class="label-text text-lg font-bold text-gray-700">Correo Institucional</span>
            </label>
            <input id="reg-email" type="email" bind:value={email} placeholder="estudiante@uv.mx" class="input input-bordered input-lg w-full bg-gray-50 text-lg" required />
        </div>

        <div class="form-control">
            <label class="label" for="reg-pass">
              <span class="label-text text-lg font-bold text-gray-700">Contraseña</span>
            </label>
            <input id="reg-pass" type="password" bind:value={password} placeholder="••••••••" class="input input-bordered input-lg w-full bg-gray-50 text-lg" required />
        </div>

        <button type="submit" class="btn btn-primary text-white btn-lg w-full shadow-lg mt-4 text-xl font-bold border-none" disabled={isLoading}>
          {#if isLoading} <span class="loading loading-spinner"></span> {/if}
          Registrarse
        </button>
    </form>

    <div class="text-center mt-6">
      <a href="/login" class="link link-hover text-gray-500 text-lg">¿Ya tienes cuenta? Ingresa</a>
    </div>
  </div>
</div>