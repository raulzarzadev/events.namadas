import Icon from '@comps/Icon'
import RadioInput from '@comps/inputs/Radio'
import { useEffect, useState } from 'react'

const EventTypeForm = ({ setValue, formValues }: any) => {
  const EVENTS_VARIANTS: Record<string, string[]> = {
    type: ['sports', 'social'],
    sports: ['swim', 'run', 'bike', 'multi'],
    swim: ['pool', 'openWater', 'lake', 'river'],
    bike: ['route', 'mountain', 'gravel', 'city'],
    run: ['soft', 'road', 'mountain', 'city'],
    multi: ['duathlon', 'triathlon', 'pentathlon '],
    triathlon: [
      'super-sprint',
      'sprint',
      'olympic',
      '70.30',
      'iron-man',
      'valle-man'
    ],
    pool: ['-25m', '25m', '50m', '+50m'],
    openWater: ['sea', 'lake', 'river', 'cruce'],
    social: ['public', 'private']
  }

  const [sportType, setSportType] = useState<string[]>(formValues?.labels || [])

  const handleChange = ({ target: { name } }: any) => {
    setSportType([...sportType, name])
  }

  const handleRemoveType = (type: string) => {
    const indexOfType = sportType.indexOf(type)
    const res = sportType.slice(0, indexOfType)
    setSportType(res)
  }

  useEffect(() => {
    setValue('labels', sportType)
  }, [sportType])

  return (
    <div className=" w-full">
      <h3 className="text-sm">Classify</h3>
      <div className="flex flex-wrap w-full justify-around ">
        {sportType.includes('social') ||
          sportType.includes('sports') ||
          EVENTS_VARIANTS.type.map((variant) => (
            <RadioInput
              key={variant}
              label={variant}
              value={variant}
              name={variant}
              onChange={handleChange}
            />
          ))}
        <div className="flex flex-wrap w-full justify-around">
          {sportType.map((type) => (
            <div
              key={type}
              className="flex m-1 border rounded-full px-2 items-center shadow-md "
            >
              {type}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleRemoveType(type)
                }}
              >
                <Icon name="cross" size="xs" />
              </button>
            </div>
          ))}
        </div>

        {EVENTS_VARIANTS?.[sportType[sportType.length - 1]]?.map(
          (sport: string) => {
            return (
              <RadioInput
                key={sport}
                label={sport}
                value={sport}
                name={sport}
                onChange={handleChange}
              />
            )
          }
        )}
      </div>
    </div>
  )
}

export default EventTypeForm
