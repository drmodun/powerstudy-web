import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/question-answers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/question-answers/"!</div>
}
