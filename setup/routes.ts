import type { RouteRecordRaw } from 'vue-router'

export default function setupRoutes(routes: RouteRecordRaw[]) {
  const playRouteIndex = routes.findIndex(route => route.name === 'play')

  routes.splice(playRouteIndex, 0, {
    name: 'speaker-notes',
    path: '/speaker-notes',
    component: () => import('../components/SpeakerNotes.vue'),
  })

  return routes
}
