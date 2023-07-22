export default defineNuxtRouteMiddleware(() => {
  // execute only on client side
  if (!process.client) return

  if (!useSessionStore().isLoggedIn) return navigateTo('/')
  if (
    !useSessionStore()
      .getUser()
      .hasCompletedHisProfile()
  )
    return navigateTo('/profile')
})
