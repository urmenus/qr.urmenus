<template>
  <div>
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  templateParams: { separator: '•' },
  htmlAttrs: { lang: 'ru' },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
useQrCode('result')
const meta = {
  title: 'Генератор qr-карты',
  description: 'Место для генерации карточки для тейблтента в вашем ресторане',
}
useSeoMeta({
  title: meta.title,
  description: meta.description,
  twitterTitle: meta.title,
  twitterDescription: meta.description,
})

defineOgImageComponent('Menus', meta)
</script>

<style>
.qwe {
  border: 1px solid salmon;
}
.qwe2 > * {
  border: 1px solid salmon;
}
.qwe3 * {
  border: 1px solid salmon;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.05rem);
}
</style>
