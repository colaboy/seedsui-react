import React from 'react'
import { useForm as useRcForm } from 'rc-field-form'

function useForm(form) {
  const [rcForm] = useRcForm()

  const wrapForm = React.useMemo(
    () =>
      form ?? {
        ...rcForm,
        scrollToField: (name, options) => {
          console.log(document.querySelector(`#form-item-${name}`))
          document
            .querySelector(`#form-item-${name}`)
            .scrollIntoView({ behavior: 'smooth', block: 'start', ...options })
        }
      },
    [form, rcForm]
  )

  return [wrapForm]
}

export default useForm
