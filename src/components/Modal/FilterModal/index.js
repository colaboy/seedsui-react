import React, { forwardRef } from 'react'
import Modal from './../Modal'
import Footer from './Footer'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Layout from './../../Layout'
import NavBar from './../../NavBar'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Layout, NavBar } from 'seedsui-react'
测试使用-start */

// 侧边查询
function FilterModal(
  { visible, onVisibleChange, onOk, onCancel, onReset, onConfig, children, ...props },
  ref
) {
  return (
    <Modal
      ref={ref}
      portal={false}
      animation="slideLeft" // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      {...props}
      className={`modal-filtermodal${props?.className ? ' ' + props.className : ''}`}
      visible={visible}
      onVisibleChange={(currentVisible) => {
        if (!currentVisible) {
          onCancel && onCancel()
        }
      }}
    >
      <Layout className="full modal-filtermodal-layout">
        <Layout.Header>
          <NavBar>
            <NavBar.Button onClick={onCancel}>{LocaleUtil.locale('取消')}</NavBar.Button>
            <NavBar.Title>{LocaleUtil.locale('筛选')}</NavBar.Title>
            <NavBar.Button>&nbsp;&nbsp;</NavBar.Button>
          </NavBar>
        </Layout.Header>
        <Layout.Main>{children}</Layout.Main>
        {/* 底部 */}
        <Footer onReset={onReset} onOk={onOk} onConfig={onConfig} />
      </Layout>
    </Modal>
  )
}

export default forwardRef(FilterModal)
