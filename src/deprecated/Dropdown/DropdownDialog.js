import React, { forwardRef } from 'react'
import Dialog from './../Dialog'
import MenuTiled from './../MenuTiled'

const DropdownDialog = forwardRef(
  (
    {
      show,
      dialogProps = {},

      multiple,
      list,
      selected,
      onChange,
      menutiledProps = {}
    },
    ref
  ) => {
    return (
      <Dialog
        animation="slideDown"
        show={show}
        style={{
          width: '100%'
        }}
        {...dialogProps}
      >
        <MenuTiled
          multiple={multiple}
          list={list}
          selected={selected}
          onChange={onChange}
          {...menutiledProps}
          cancelAttribute={{
            onClick:
              dialogProps.maskAttribute && dialogProps.maskAttribute.onClick
                ? dialogProps.maskAttribute.onClick
                : null
          }}
        />
      </Dialog>
    )
  }
)

export default DropdownDialog
