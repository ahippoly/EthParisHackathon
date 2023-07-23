export default defineNuxtRouteMiddleware(() => {
  // execute only on client side
  if (!process.client) return

  if (
    useSessionStore()
      .getUser()
      ?.hasCompletedHisProfile()
  )
    return navigateTo('/chats')
  else return navigateTo('/register')
})
