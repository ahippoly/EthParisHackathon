export const useWindowSize = () => {
  const windowSize = reactive({
    height: 0,
    width: 0
  })

  function updateWindowSize() {
    windowSize.height = window.innerHeight
    windowSize.width = window.innerWidth
  }

  onMounted(() => {
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return windowSize
}
