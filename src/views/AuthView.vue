<script setup>
import { useGreenLink } from '../composables/useGreenLink.js'

const {
  authMode, authNotice, authSubmitting, loginErrors, loginForm, registerErrors, registerForm,
  submitLogin, submitRegister, validateLoginEmail, validateLoginPassword,
  validateRegisterEmail, validateRegisterName, validateRegisterPassword,
} = useGreenLink()
</script>

<template>
  <section class="login-page auth-page">
    <section class="login-card" aria-labelledby="login-heading">
      <div class="login-copy">
        <span class="brand-mark">GL</span><p class="eyebrow">GreenLink Melbourne</p>
        <h1 id="login-heading">{{ authMode === 'login' ? 'Log in to continue.' : 'Create an account.' }}</h1>
        <p>Access green space tools, event registration, saved items, role-based account features, and review ratings.</p>
        <p v-if="authNotice" class="auth-notice">{{ authNotice }}</p>
      </div>
      <div>
        <div class="auth-switch" role="tablist" aria-label="Authentication mode">
          <button type="button" :class="{ active: authMode === 'login' }" @click="authMode = 'login'">Log in</button>
          <button type="button" :class="{ active: authMode === 'register' }" @click="authMode = 'register'">Register</button>
        </div>
        <form v-if="authMode === 'login'" class="interest-form" novalidate @submit.prevent="submitLogin">
          <div class="form-field">
            <label for="login-email">Email address</label>
            <input id="login-email" v-model="loginForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(loginErrors.email)" @blur="validateLoginEmail(true)" @input="validateLoginEmail(false)" />
            <p v-if="loginErrors.email" class="field-error">{{ loginErrors.email }}</p>
          </div>
          <div class="form-field">
            <label for="login-password">Password</label>
            <input id="login-password" v-model="loginForm.password" type="password" autocomplete="current-password" :aria-invalid="Boolean(loginErrors.password)" @blur="validateLoginPassword(true)" @input="validateLoginPassword(false)" />
            <p v-if="loginErrors.password" class="field-error">{{ loginErrors.password }}</p>
          </div>
          <p v-if="loginErrors.account" class="field-error">{{ loginErrors.account }}</p>
          <button class="button primary form-submit" type="submit" :disabled="authSubmitting">{{ authSubmitting ? 'Logging in…' : 'Log in' }}</button>
          <p class="demo-note">Authentication is securely handled by Firebase. Register below if you do not have an account.</p>
        </form>
        <form v-else class="interest-form" novalidate @submit.prevent="submitRegister">
          <div class="form-field"><label for="register-name">Full name</label><input id="register-name" v-model="registerForm.name" type="text" autocomplete="name" :aria-invalid="Boolean(registerErrors.name)" @blur="validateRegisterName(true)" @input="validateRegisterName(false)" /><p v-if="registerErrors.name" class="field-error">{{ registerErrors.name }}</p></div>
          <div class="form-field"><label for="register-email">Email address</label><input id="register-email" v-model="registerForm.email" type="email" autocomplete="email" :aria-invalid="Boolean(registerErrors.email)" @blur="validateRegisterEmail(true)" @input="validateRegisterEmail(false)" /><p v-if="registerErrors.email" class="field-error">{{ registerErrors.email }}</p></div>
          <div class="form-field"><label for="register-password">Password</label><input id="register-password" v-model="registerForm.password" type="password" autocomplete="new-password" :aria-invalid="Boolean(registerErrors.password)" @blur="validateRegisterPassword(true)" @input="validateRegisterPassword(false)" /><p v-if="registerErrors.password" class="field-error">{{ registerErrors.password }}</p></div>
          <p class="demo-note">New accounts are created as residents. Organiser access is granted separately by an administrator.</p>
          <button class="button primary form-submit" type="submit" :disabled="authSubmitting">{{ authSubmitting ? 'Creating account…' : 'Create account' }}</button>
        </form>
      </div>
    </section>
  </section>
</template>
