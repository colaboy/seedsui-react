import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useContext,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import Carrousel from './../Carrousel'
import InputPre from './../InputPre'
import Button from './../Button'
import Instance from './instance.js'
import emojiData from './instance.data.js'
import Context from '../Context/instance.js'

const Emoji = forwardRef(
  (
    {
      portal,
      // show, // ios内核必须隐藏, 不能移除dom, 弹出时才不会有bug, 所以必须用show
      data = emojiData,

      autoFocus = false,
      value,
      placeholder,

      maskAttribute = {},
      submitAttribute = {},
      inputProps = {},
      carrouselProps = {},
      liconAttribute,
      licon,

      onChange,
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }
    let [tempValue, setTempValue] = useState(value)
    const instance = useRef(null)
    // 自动扩充功能
    function preAutoSize(target, preTarget) {
      target.style.height = preTarget.clientHeight + 'px'
    }
    // 初始化
    useEffect(() => {
      // 输入框
      let elInput = refEl.current.querySelector('.input-pre')
      if (!elInput) return
      let elPre = elInput.nextElementSibling
      if (elPre.tagName !== 'PRE') return
      if (autoFocus && elInput) elInput.focus()
      instance.current = new Instance({
        data: data,
        mask: refEl.current,
        isClickMaskHide: false
        // onClickMask: (s) => {
        //   if (maskAttribute.onClick) maskAttribute.onClick(s.event)
        // },
        // onClickSubmit: (s) => {
        //   if (submitAttribute.onClick) {
        //     submitAttribute.onClick(s.event, tempValue)
        //   }
        // },
        // onChange: (s, val) => { // 点击表情
        //   setTempValue(val)
        //   // 自增高
        //   preAutoSize(elInput, elPre);
        //   // 触发onChange
        //   if (onChange) onChange(s, val)
        // }
      })
      // 如果初始化就有值, 则设置光标位置和自增高
      if (elInput.value) {
        instance.current.cursorOffset = elInput.value.length - 1
        instance.current.setCaretPosition(elInput, instance.current.cursorOffset)
        // 自增高
        preAutoSize(elInput, elPre)
      }
    }, []) // eslint-disable-line

    useEffect(() => {
      setTempValue(value)
    }, [value])

    // 因为synchronization模式, 每次组件在render的时候都生成了一份本次render的state、function、effects, 这些与之前或者之后的render没关系, 所以当值发生变化时需要即时的更新回调
    useEffect(() => {
      // 输入框
      let elInput = refEl.current.querySelector('.input-pre')
      if (!elInput) return
      let elPre = elInput.nextElementSibling
      if (elPre.tagName !== 'PRE') return
      instance.current.updateParams({
        onClickMask: (s) => {
          if (maskAttribute.onClick) maskAttribute.onClick(s.event)
        },
        onClickSubmit: (s) => {
          if (submitAttribute.onClick) {
            submitAttribute.onClick(s.event, tempValue)
          } else if (onChange) {
            // 触发onChange
            if (onChange) onChange(s, tempValue)
          }
        },
        onChange: (s, val) => {
          // 点击表情
          setTempValue(val)
          // 自增高
          preAutoSize(elInput, elPre)
          // 触发onChange
          if (onChange) onChange(s, val)
        }
      })
      // eslint-disable-next-line
    }, [tempValue])

    // 表情
    function getFaceDOM() {
      // icons分页变量
      const icons = []
      let page = 0
      let index = 0
      let count = 23
      // icons分页
      for (let name in data) {
        if (index !== 0 && index % count === 0) {
          page++
        }
        if (!icons[page]) icons[page] = []
        icons[page].push({ id: name, name: data[name] })
        index++
      }
      // 生成DOM
      return icons.map((icon, i) => {
        return (
          <div key={`page${i}`} className={`emoji-carrousel-slide`}>
            {icon.map((item, index) => {
              return (
                <span
                  key={`face${index}`}
                  className={`emoji-face`}
                  data-emoji={item.name}
                  title={item.id}
                >
                  &nbsp;
                </span>
              )
            })}
            <span className={`emoji-face-delete`}>&nbsp;</span>
          </div>
        )
      })
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    function change(e, val) {
      setTempValue(val)
    }

    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherSubmitAttribute = filterProps(submitAttribute)
    return createPortal(
      <div
        ref={refEl}
        {...maskAttribute}
        className={`mask emoji-mask active${
          otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''
        }`}
      >
        <div
          {...others}
          className={`emoji active${others.className ? ' ' + others.className : ''}`}
        >
          <div className="emoji-edit">
            {licon}
            {liconAttribute && (
              <i
                {...liconAttribute}
                className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}
              ></i>
            )}
            <InputPre
              className="emoji-edit-input"
              value={tempValue}
              placeholder={placeholder || locale('说点什么吧...', 'SeedsUI_say_something')}
              {...inputProps}
              onChange={change}
            />
            <i className={`icon emoji-edit-icon`}></i>
            <Button
              {...otherSubmitAttribute}
              className={`emoji-edit-submit${
                otherSubmitAttribute.className ? ' ' + otherSubmitAttribute.className : ''
              }`}
              disabled={!tempValue}
            >
              {otherSubmitAttribute.caption || locale('提交', 'SeedsUI_submit')}
            </Button>
          </div>
          <Carrousel
            {...carrouselProps}
            pagination
            className={`carrousel-container emoji-carrousel${
              carrouselProps.className ? ' ' + carrouselProps.className : ''
            }`}
            style={Object.assign({ display: 'none' }, carrouselProps.style)}
          >
            {getFaceDOM()}
          </Carrousel>
        </div>
      </div>,
      portal || context.portal || document.getElementById('root') || document.body
    )
  }
)

export default Emoji
