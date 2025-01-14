// 视频控件样式修改
function getSkinLayout(isLive) {
  if (isLive) {
    return [
      {
        name: 'bigPlayButton',
        align: 'cc'
      },
      {
        name: 'controlBar',
        align: 'blabs',
        x: 0,
        y: 0,
        children: [
          { name: 'progress', align: 'tlabs', x: 0, y: 0 },
          { name: 'playButton', align: 'tl', x: 15, y: 26 },
          { name: 'nextButton', align: 'tl', x: 10, y: 26 },
          { name: 'timeDisplay', align: 'tl', x: 10, y: 24 },
          { name: 'fullScreenButton', align: 'tr', x: 10, y: 25 },
          { name: 'streamButton', align: 'tr', x: 10, y: 23 },
          { name: 'volume', align: 'tr', x: 10, y: 25 }
        ]
      },
      {
        name: 'fullControlBar',
        align: 'tlabs',
        x: 0,
        y: 0,
        children: [
          { name: 'fullTitle', align: 'tl', x: 25, y: 6 },
          { name: 'fullNormalScreenButton', align: 'tr', x: 24, y: 13 },
          { name: 'fullTimeDisplay', align: 'tr', x: 10, y: 12 },
          { name: 'fullZoom', align: 'cc' }
        ]
      }
    ]
  }
  return [
    {
      name: 'bigPlayButton',
      align: 'cc'
    },
    {
      name: 'H5Loading',
      align: 'cc'
    },
    {
      name: 'errorDisplay',
      align: 'tlabs',
      x: 0,
      y: 0
    },
    {
      name: 'infoDisplay'
    },
    {
      name: 'tooltip',
      align: 'blabs',
      x: 0,
      y: 56
    },
    {
      name: 'thumbnail'
    },
    {
      name: 'controlBar',
      align: 'blabs',
      x: 0,
      y: 0,
      children: [
        { name: 'progress', align: 'blabs', x: 0, y: 44 },
        { name: 'playButton', align: 'tl', x: 15, y: 12 },
        { name: 'timeDisplay', align: 'tl', x: 10, y: 7 },
        { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
        { name: 'subtitle', align: 'tr', x: 15, y: 12 },
        { name: 'setting', align: 'tr', x: 15, y: 12 },
        { name: 'volume', align: 'tr', x: 5, y: 10 }
      ]
    }
  ]
}

export default getSkinLayout
