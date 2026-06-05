import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gifts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/gifts"!</div>
}
