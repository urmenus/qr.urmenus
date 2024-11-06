<template>
  <div class="flex flex-col md:flex-row gap-4 p-4 w-screen relative">
    <div class="h-full w-full md:w-2/5">
      <!--  -->
      <div class="card card-compact bg-base-300 w-full md:max-w-sm shrink-0 shadow-2xl">
        <div class="card-body w-full">
          <h2 class="card-title text-base font-medium justify-between pr-2">
            <span>Опции</span>
            <div class="tooltip tooltip-bottom" data-tip="Свернуть">
              <button class="btn btn-sm btn-square" @click="Object.values($refs).forEach((_ref) => _ref!.close())">
                <Icon name="menus:collapse-all" size="1rem" />
              </button>
            </div>
          </h2>
          <div class="menu bg-base-200 rounded-box space-y-2">
            <li>
              <qr-code-options-dots ref="dots" />
            </li>
            <div class="divider !my-0"></div>
            <li>
              <qr-code-options-corners ref="corners" />
            </li>
            <div class="divider !my-0"></div>
            <li>
              <qr-code-options-image ref="image" />
            </li>
            <div class="divider !my-0"></div>
            <li>
              <qr-code-options-format ref="format" />
            </li>
            <div class="divider !my-0"></div>
            <li>
              <qr-code-options-presets ref="presets" />
            </li>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="md:h-full fixed bottom-0 inset-x-4 md:relative md:w-3/5">
      <QrCodeResult />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { title } = storeToRefs(useTableTent())
const { options } = useQrCode('result')

const { restaurant } = storeToRefs(useUser())

watchImmediate(restaurant, (val) => {
  if (!val) return navigateTo('/')
  title.value = val.title
  options.value.data = `https://urmenus.ru/${val.id}`
})
</script>
