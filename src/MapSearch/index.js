import React from 'react'
import Page from './../Page'
import Header from './../Header'
import BMap from './BMap'
import Container from './../Container'
import InputText from './../InputText'
import Card from './../Card'

function MapSearch() {
  return (
    <Page>
      <Header style={{ height: '200px' }}>
        <BMap onMapClose={handleMapClose} callback={handleCallback} />
      </Header>
      <Header style={{ backgroundColor: '#ffffff' }}>
        <InputText
          licon={
            <i
              className="icon icon-search"
              style={{
                marginLeft: '-4px',
                marginRight: '2px',
                color: '#707070',
                fontSize: '16px'
              }}
            />
          }
          placeholder={locale('搜索地点')}
          value={selected.title}
          clear
          className="bordered bg-white"
          inputAttribute={{ style: { padding: '4px 0' } }}
          style={{ padding: '0 12px', borderRadius: '16px', margin: '6px 12px' }}
          onChange={handleChange}
        />
      </Header>
      <Container style={{ backgroundColor: '#ffffff' }}>
        {(list || []).map((attr, index) => {
          return (
            <div key={index}>
              {index !== 0 && <div style={{ height: '1px', borderTop: '1px solid #dedede' }} />}
              <Card onClick={() => handleCardClick(attr)}>
                <div>{attr.title || ''}</div>
                <div style={{ color: '#707070' }}>{attr.address || ''}</div>
              </Card>
            </div>
          )
        })}
      </Container>
    </Page>
  )
}
export default MapSearch
