<template>
  <div v-if="isMobile && isMounted" class="">
    <details class="collapse bg-base-300 shadow rounded-b-none">
      <summary
        class="collapse-title text-base font-medium pr-4 border border-primary border-dashed rounded-t-box"
        @click="isOpen = !isOpen"
      >
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <span>Результат</span>

            <QrCodeReadableTooltip mobile :is-open="isOpen" />
          </div>
          <div class="">
            <!--  -->
            <ul class="menu bg-base-200 rounded-box w-56">
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Item 2
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Item 1
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Item 3
                </a>
              </li>
            </ul>
            <!--  -->
            <div class="tooltip tooltip-left" data-tip="Восстановить" v-show="isOpen">
              <button class="btn btn-square btn-sm" @click.stop="$refs.card?.resetPosition()">
                <Icon name="bx:reset" size="1.5rem" />
              </button>
            </div>
          </div>
          <button class="btn btn-square btn-ghost btn-xs" v-show="!isOpen">
            <Icon name="ph:hand-pointing" size="1.5rem" />
          </button>
        </div>
      </summary>
      <div class="collapse-content border border-primary border-dashed border-t-0">
        <div class="bg-base-200 ~w-[25rem] ~h-[30rem] overflow-hidden relative">
          <ClientOnly>
            <KonvaCard ref="card" />
          </ClientOnly>
        </div>
      </div>
    </details>
  </div>
  <div v-else-if="!isMobile && isMounted" class="">
    <div class="card card-compact bg-base-300 shadow">
      <div class="card-body">
        <h2 class="card-title text-base font-medium pr-4">
          <div class="flex w-full items-center justify-between">
            <div class="flex gap-2">
              <span>Результат</span>

              <QrCodeReadableTooltip />
            </div>
            <div class="tooltip tooltip-left" data-tip="Восстановить">
              <button class="btn btn-square btn-sm" @click.stop="$refs.card?.resetPosition()">
                <Icon name="bx:reset" size="1rem" />
              </button>
            </div>
          </div>
        </h2>
        <div class="bg-base-200 ~w-[25rem] ~h-[30rem]">
          <ClientOnly>
            <KonvaCard ref="card" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smallerOrEqual('md')
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>
