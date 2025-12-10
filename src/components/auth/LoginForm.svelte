<!-- muestra el formulario de ingreso -->
<script lang="ts">
  import axios from 'axios';

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';
  let username = ''; 
  let password = '';
  let error = '';
  let isLoading = false;

  async function handleLogin() {
    isLoading = true;
    error = '';
    
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: username, 
        password: password
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
      error = 'Credenciales incorrectas o usuario no encontrado.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="card w-full max-w-md bg-white shadow-xl border border-blue-100 mx-auto">
  <div class="card-body p-8">
    
    <div class="text-center mb-6">
      <h2 class="text-3xl font-black text-blue-900 mb-2">¡Hola de nuevo!</h2>
      <p class="text-gray-500 text-lg">Ingresa a tu cuenta</p>
    </div>
    
    {#if error}
        <div class="alert alert-error text-white shadow-md mb-4 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
    {/if}

    <form on:submit|preventDefault={handleLogin} class="flex flex-col gap-5">
        
        <div class="form-control">
            <label class="label" for="login-email">
              <span class="label-text text-lg font-bold text-gray-700">Correo Electrónico</span>
            </label>
            <input 
              id="login-email" 
              type="text" 
              bind:value={username} 
              placeholder="tu@correo.com" 
              class="input input-bordered input-lg w-full focus:input-primary bg-gray-50 text-lg" 
              required 
            />
        </div>

        <div class="form-control">
            <label class="label" for="login-pass">
              <span class="label-text text-lg font-bold text-gray-700">Contraseña</span>
            </label>
            <input 
              id="login-pass" 
              type="password" 
              bind:value={password} 
              placeholder="••••••••" 
              class="input input-bordered input-lg w-full focus:input-primary bg-gray-50 text-lg" 
              required 
            />
        </div>

        <button type="submit" class="btn btn-primary text-white btn-lg w-full shadow-lg mt-2 text-xl font-bold border-none" disabled={isLoading}>
          {#if isLoading} <span class="loading loading-spinner"></span> {/if}
          Ingresar
        </button>
    </form>
    
    <div class="divider my-6 text-gray-400">O</div>
    
    <div class="text-center">
      <p class="text-gray-600 text-lg">¿No tienes cuenta?</p>
      <a href="/registro" class="link link-primary font-bold text-lg hover:text-blue-700">Regístrate aquí</a>
    </div>
  </div>
</div>