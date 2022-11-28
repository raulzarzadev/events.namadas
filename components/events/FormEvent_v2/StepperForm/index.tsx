import Icon from '@comps/Icon'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export interface Step {
  label: string
  Component: ReactNode
  helperText?: string
}

const StepperForm = ({ steps }: { steps: Step[] }) => {
  const router = useRouter()
  // @ts-expect-error
  const preselectStep = parseInt(router?.query?.step)
  const [stepSelected, setStepSelected] = useState(preselectStep || 0)

  useEffect(() => {
    const { id } = router.query
    router.push({ query: { step: stepSelected, id } })
  }, [stepSelected])

  const handlePrev = () => {
    setStepSelected((state) => (state > 0 ? state - 1 : state))
  }

  const handleNext = () => {
    setStepSelected((state) => (state < steps.length - 1 ? state + 1 : state))
  }

  return (
    <div className="relative ">
      <div className="flex justify-center relative ">
        <div></div>
        <ul className="steps steps-horizontal  pb-4">
          {steps.map((step, i) => (
            <li
              key={i}
              onClick={(e) => {
                e.preventDefault()
                setStepSelected(i)
              }}
              className={`step    
              ${stepSelected >= i ? 'step-primary ' : ''}
              ${!(stepSelected === i) ? ' !min-w-[20px] ' : ' '}
              `}
            >
              <button
                className={`whitespace-nowrap bg-base-100 px-2 ${
                  stepSelected === i ? ' z-0 ' : ' text-2xs '
                }`}
              >
                {step.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full justify-between">
        <button
          onClick={(e) => {
            e.preventDefault()
            handlePrev()
          }}
          className="btn  "
          disabled={stepSelected <= 0}
        >
          <Icon name="left-arrow" />
          Prev
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleNext()
          }}
          className="btn "
          disabled={stepSelected >= steps.length - 1}
        >
          Next
          <Icon name="rigth-arrow" />
        </button>
      </div>
      {steps[stepSelected]?.helperText && (
        <div className="bg-info px-2 rounded-lg m-2">
          <span className="text-xs text-info-content ">
            {steps[stepSelected]?.helperText}
          </span>
        </div>
      )}
      {steps[stepSelected].Component}
    </div>
  )
}

export default StepperForm
