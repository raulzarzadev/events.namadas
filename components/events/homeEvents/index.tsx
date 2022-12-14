import { Event } from '@firebase/Events/event.model'
import EventsRow from '../eventsRow'

const HomeEvents = ({ events }: { events: Event[] }) => {
  const groupEventsByLabels = (events: Event[]) => {
    return events.reduce((prev: any, curr: any) => {
      curr?.labels?.forEach((label: string) => {
        if (prev[label]) {
          prev[label] = [...prev[label], curr]
        } else {
          prev[label] = [curr]
        }
      })
      return { ...prev }
    }, {})
  }

  const groupByDate = (events: Event[]) => {
    return events.reduce(
      (prev: any, curr: any) => {
        if (curr.date < new Date().getTime()) {
          return { ...prev, past: [...prev.past, curr] }
        } else {
          return { ...prev, upcoming: [...prev.upcoming, curr] }
        }
      },
      {
        upcoming: [],
        past: []
      }
    )
  }
  const omitPatsEvent = (events: Event[]) =>
    events.filter((event) => (event?.date ?? 0) > new Date().getTime())

  const eventsByDate = groupByDate(events)
  const eventsByLabels = groupEventsByLabels(omitPatsEvent(events))

  const ROWS_TITLES: Record<string, string> = {
    upcoming: 'PrΓ³ximamente β°',
    sports: 'Todos los Deportes π',
    past: 'Pasados βοΈ',
    bike: 'Bicicleta π΅',
    route: 'Bici de Ruta π΄',
    mountain: 'MontaΓ±a ποΈ',
    run: 'Correr π',
    city: 'En ciudad π’',
    multi: 'Multideporte πββοΈ π΄ββοΈπββοΈ',
    triathlon: 'TriatlΓ³n πββοΈ π΄ββοΈπββοΈ',
    'valle-man': 'ValleMan πββοΈ πββοΈ πββοΈ π΄ββοΈπ΄ββοΈπ΄ββοΈπββοΈπββοΈπββοΈ',
    swim: 'NataciΓ³n π',
    sea: 'En el mal ππββοΈ',
    openWater: 'Aguas abiertas ππββοΈ'
  }
  return (
    <div className="grid gap-4">
      {Object.entries(eventsByDate).map(([key, events]: any) => (
        <EventsRow key={key} title={ROWS_TITLES[key] || key} events={events} />
      ))}
      {Object.entries(eventsByLabels).map(([key, events]: any) => (
        <EventsRow key={key} title={ROWS_TITLES[key] || key} events={events} />
      ))}
    </div>
  )
}

export default HomeEvents
