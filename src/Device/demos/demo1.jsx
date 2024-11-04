import React, { useEffect, useRef, useState } from 'react'

import { Layout, Device, Card } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <p className="demo-title">language</p>
        <Card style={{ padding: 12 }}>{Device.language}</Card>

        <p className="demo-title">protocol</p>
        <Card style={{ padding: 12 }}>{Device.protocol}</Card>
        <p className="demo-title">host</p>
        <Card style={{ padding: 12 }}>{Device.host}</Card>
        <p className="demo-title">domain</p>
        <Card style={{ padding: 12 }}>{Device.domain}</Card>
        <p className="demo-title">kernel</p>
        <Card style={{ padding: 12 }}>{Device.kernel}</Card>
        <p className="demo-title">device</p>
        <Card style={{ padding: 12 }}>{Device.device}</Card>
        <p className="demo-title">os</p>
        <Card style={{ padding: 12 }}>{Device.os}</Card>
        <p className="demo-title">osVersion</p>
        <Card style={{ padding: 12 }}>{Device.osVersion}</Card>
        <p className="demo-title">model</p>
        <Card style={{ padding: 12 }}>{Device.model}</Card>
        <p className="demo-title">platform</p>
        <Card style={{ padding: 12 }}>{Device.platform}</Card>
        <p className="demo-title">platformVersion</p>
        <Card style={{ padding: 12 }}>{Device.platformVersion}</Card>

        <p className="demo-title">isOnLine</p>
        <Card style={{ padding: 12 }}>{String(Device.isOnLine || '')}</Card>
        <p className="demo-title">userAgent</p>
        <Card style={{ padding: 12 }}>{Device.userAgent}</Card>
        <p className="demo-title">getUrlParameter</p>
        <Card style={{ padding: 12 }}>{Device.getUrlParameter('locale')}</Card>
        <p className="demo-title">screenWidth</p>
        <Card style={{ padding: 12 }}>{Device.screenWidth}</Card>
        <p className="demo-title">screenHeight</p>
        <Card style={{ padding: 12 }}>{Device.screenHeight}</Card>
        <p className="demo-title">compareVersion: 7_7_10 vs 7_7_5</p>
        <Card style={{ padding: 12 }}>{Device.compareVersion('7_7_10', '7_7_5', '_')}</Card>
      </Layout.Main>
    </Layout>
  )
}
