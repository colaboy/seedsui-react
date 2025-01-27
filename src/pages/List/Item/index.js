import React from 'react'
import { Card } from 'seedsui-react'

export default function Item({ item }) {
  return (
    <Card
      style={{ padding: '10px 12px' }}
      onClick={() => {
        location.href = '#asdf'
      }}
    >
      <p className="flex-1 list-caption font-size-l bold">{item.name}</p>
      <p className="color-sub">{item.secondary}</p>
    </Card>
  )
}
