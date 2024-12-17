import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/math-problems/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/math-problems/"!</div>
}
