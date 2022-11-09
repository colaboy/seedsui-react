import React, { forwardRef } from 'react'
import Modal from './../../Modal'
import Preview from './Map/Preview'
import Choose from './Map/Choose'

// 地图标注
const LocationModal = forwardRef(
  (
    {
      ak,
      // 值: {latitude: '纬度', longitude: '经度', address:'地址', value: ''}
      value,
      onChange,

      visible, // preview、choose
      onVisibleChange,
      ...props
    },
    ref
  ) => {
    function handleChange(newValue) {
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }
    return (
      <Modal
        ref={ref}
        visible={visible}
        onVisibleChange={onVisibleChange}
        {...props}
        animation="slideUp"
        className="location-modal"
      >
        {visible === 'preview' && <Preview ak={ak} value={value} />}
        {visible === 'choose' && <Choose ak={ak} value={value} onChange={handleChange} />}
      </Modal>
    )
  }
)

export default LocationModal
