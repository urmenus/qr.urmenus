<template>
  <div class="drawer">
    <input id="header" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col relative">
      <!-- Navbar -->
      <div class="navbar bg-base-300 w-full fixed top-0 inset-x-0">
        <div class="flex-none md:hidden">
          <label for="header" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <Icon name="bx:menu" size="1.5rem" />
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">
          <nuxt-link to="/" class="btn">Menus</nuxt-link>
        </div>
        <div class="navbar-end hidden md:flex">
          <details class="dropdown dropdown-end">
            <summary class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="/user.webp" />
              </div>
            </summary>
            <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <NuxtLink href="https://urmenus.ru" target="_blank" class="justify-between"> В ресторан </NuxtLink>
              </li>
              <li><a>Выйти</a></li>
            </ul>
          </details>
        </div>
      </div>
      <slot />
    </div>
    <div class="drawer-side">
      <label for="header" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
