import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, Divider, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { DetayAlani, DetayBaslik, Icerik, IcerikAlani } from '../listeler/ortakStyle'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import BreadCrumbs from '../BreadCrumbs'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  margin: 70px 12px
`
const Baslik = styled.div`
  text-align: center;
  color: rgb(90, 111, 123);
  font-weight: bold;
  font-size: 1.4em;
`
export default function AnketDetay ({ match }) {
  const anketler = useRecoilValue(anketlerState)
  const seciliAnketId = match.params.id
  const seciliAnket = anketler.find(anket => anket.id === seciliAnketId)
  const ustDurumu = seciliAnket && seciliAnket.ustDurumu
    ? seciliAnket.ustDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'

  const harzemliDurumu = seciliAnket && seciliAnket.harzemliDurumu
    ? seciliAnket.harzemliDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'

  return (
    <Wrapper>
      <BreadCrumbs
        mevcutSayfaUrl={match.url}
        oncekiSayfaUrl="/anketler"
        text1="Anket Listesi"
        text2="Anket Detayı"
      />
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={5}/>
          <Col>
            <Popover content={
              <Menu>
                <MenuItem text={(
                  <Link to="/anketler/yeni-anket">
                    <Button minimal intent="success" text="Yeni Anket Ekle" rightIcon={'plus'}/>
                  </Link>
                )}/>
                <MenuItem text={(
                  <Link to={`/anketler/guncelle/${seciliAnket.id}`}>
                    <Button minimal intent="warning" text="Bilgileri Güncelle" rightIcon={'edit'}/>
                  </Link>
                )}/>
              </Menu>
            } position={Position.RIGHT}>
              <Button icon="properties" intent="warning" minimal text="Eylemler"/>
            </Popover>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={6}>
            <DetayAlani>
              <Card>
                <Baslik>{seciliAnket.adi}</Baslik>
                <Divider/>
                <IcerikAlani>
                  <DetayBaslik>Periyodu:</DetayBaslik>
                  <Icerik>{seciliAnket.periyot ? seciliAnket.periyot.adi : '-'}</Icerik>
                  <DetayBaslik>Veri Düzeyi:</DetayBaslik>
                  <Icerik>{seciliAnket.birimDuzeyi ? seciliAnket.birimDuzeyi.adi : '-'}</Icerik>
                </IcerikAlani>
                <IcerikAlani>
                  <DetayBaslik>Örneklem Boyutu:</DetayBaslik>
                  <Icerik>{seciliAnket.orneklemSayisi}</Icerik>
                  <DetayBaslik>Coğrafi Düzeyi:</DetayBaslik>
                  <Icerik>{seciliAnket.cografiDuzey ? seciliAnket.cografiDuzey.adi : '-'}</Icerik>
                </IcerikAlani>
                <IcerikAlani>
                  <DetayBaslik>Şeması:</DetayBaslik>
                  <Icerik>{seciliAnket.sema}</Icerik>
                  <DetayBaslik>Anketör Sayısı BÖLGE:</DetayBaslik>
                  <Icerik>{seciliAnket.anketorSayisiBolge ? seciliAnket.anketorSayisiBolge : '-'}</Icerik>
                </IcerikAlani>
                <IcerikAlani>
                  <DetayBaslik>Harzemli Durumu:</DetayBaslik>
                  <Icerik>{harzemliDurumu}</Icerik>
                  <DetayBaslik>Üst Durumu:</DetayBaslik>
                  <Icerik>{ustDurumu}</Icerik>
                </IcerikAlani>
              </Card>
            </DetayAlani>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}