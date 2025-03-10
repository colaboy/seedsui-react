import { useWatch as useRcWatch } from 'rc-field-form'
import Form from './Form'
import Item from './Item'
import useForm from './useForm'

Form.Item = Item
Form.useForm = useForm
Form.useWatch = useRcWatch

export default Form
