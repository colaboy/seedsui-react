import React, { useEffect, useState } from 'react'

import InputText from './../../InputText'
import Dialog from './../../Dialog'
import locale from './../../locale'
import MapSearch from './../../MapSearch'
import helper from './helper'

export default ({ disabled, readOnly, value, onChange, ...others }) => {
  const [visible, setVisible] = useState(false)

  const [list, setList] = useState([])

  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(value || {})
  }, []) // eslint-disable-line

  const handleClick = () => {
    setVisible(true)
  }

  const handleMapClose = () => {
    setVisible(false)
  }

  const handleMapLocation = (list) => {
    setList(list)
  }

  const handleChange = (e) => {
    helper.localSearch(e.target.value, handleMapLocation)
  }

  const handleCardClick = (item) => {
    let l = item.point
    let list = [{ lng: l.lng, lat: l.lat }]
    helper.setNewCenter(list)
    helper.drawMarkers(list)
    setSelected(item)
    onChange && onChange(item)
    handleMapClose()
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setSelected({})
    onChange && onChange(null)
  }

  const handleCallback = (value) => {
    helper.localSearch(value, handleMapLocation)
  }

  return (
    <>
      {selected && Object.keys(selected || {})?.length > 0 ? (
        <div
          onClick={() => setVisible(true)}
          style={{ minHeight: '40px', padding: '6px 12px', display: 'flex', padding: 0 }}
        >
          <div className="flex-1">
            <div>{selected.title || ''}</div>
            <div style={{ color: '#707070' }}>{selected.address || ''}</div>
          </div>
          <div style={{ margin: 'auto' }}>
            <i
              className="icon icon-rdo-close-fill size18"
              style={{ color: '#707070' }}
              onClick={handleClear}
            ></i>
          </div>
        </div>
      ) : (
        <InputText
          readOnly
          className="bg-white"
          placeholder={disabled || readOnly ? '' : locale('请选择', 'SeedsUI_placeholder_select')}
          inputAttribute={{ style: { padding: 0 } }}
          style={{ padding: 0, borderRadius: 4 }}
          ricon={
            disabled || readOnly ? null : (
              <i
                className="input-location-icon-choose"
                style={{
                  width: 24,
                  height: 24,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%'
                }}
              ></i>
            )
          }
          onClick={handleClick}
          {...others}
        />
      )}
      {visible && (
        <Dialog
          portal={document.getElementById('root')}
          show={visible}
          animation="slideUp"
          style={{
            width: '100%',
            height: '90%',
            borderRadius: '18px 18px 0 0',
            backgroundColor: '#ffffff'
          }}
        >
          <MapSearch callback={handleCallback} />
        </Dialog>
      )}
    </>
  )
}
