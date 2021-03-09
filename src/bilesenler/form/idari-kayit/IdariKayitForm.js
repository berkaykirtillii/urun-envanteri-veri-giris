import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { Button, ButtonGroup, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import SelectField from '../SelectField'
import ReactQuill from 'react-quill'
import useSecenekler from '../useSecenekler'
import { useRecoilValue } from 'recoil'
import { birimlerState } from '../../store'
import { siraliKurumlar } from '../../store/selectors'
import useSayfaIciGecis from '../../hook/useSayfaIciGecis'
import IdariKayitTabloForm from './IdariKayitTabloForm'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 8px 8px;
`
const ButonAlani = styled.div`
  margin: 4px 24px;
  display: flex;
`
const ButonGrup = styled(ButtonGroup)`
  max-width: 35vw;
  width: 35vw;
  flex: 1;
`
const IcerikTemizleButon = styled(Button)`
  margin-left: 50%;
`
const FonksiyonelButonAlani = styled(Row)`
  bottom: 5%;
  right: 0;
  width: 100%;
  position: fixed;
`
export default function IdariKayitForm ({ history, seciliIdariKayit }) {
  const hiddenYasalHukumInput = React.useRef(null)
  const hiddenProtokolInput = React.useRef(null)
  const handleClick = (hiddenFile) => {
    hiddenFile.current.click()
  }
  const {
    idariGenel,
    idariTablo,
    genelIdariSayfaClick,
    tabloIdariSayfaClick,
  } = useSayfaIciGecis()
  const {
    kurumlarOption,
    veriDuzeyiOption,
    transferFormatiOption,
    birimOption,
    periyotOptions,
    cografiDuzeyOptions,
    veriBirimDuzeyiOption,
    veriTutulanYerOption,
    veriTalepBicimiOption
  } = useSecenekler()

  const birimler = useRecoilValue(birimlerState)
  const kurumlar = useRecoilValue(siraliKurumlar)
  const dosyaYukleme = (event, name, setFieldValue) => {
    setFieldValue(name, event.target.files[0])
  }
  const seciliKayitItem = (nesne) => {
    if (seciliIdariKayit && nesne) return {
      label: nesne.adi,
      value: nesne.id
    }
    else return null
  }
  const seciliGrupBaskanligi = () => {
    if (seciliIdariKayit && seciliIdariKayit.birimId !== null && birimler.length !== 0) {
      const seciliBirim = birimler.find(birim => birim.id === seciliIdariKayit.birimId)
      return { label: seciliBirim.adi, value: seciliBirim.id }
    } else return null
  }
  const seciliKaynakKurum = () => {
    if (seciliIdariKayit && seciliIdariKayit.kaynakKurumId && kurumlar.length !== 0) {
      const seciliKurum = kurumlar.find(kurum => kurum.kodu === seciliIdariKayit.kaynakKurumId)
      if (seciliKurum) {
        return { label: seciliKurum.adi, value: seciliKurum.id }
      } else return null
    } else return null
  }
  const initialValues = {
    kodu: seciliIdariKayit ? seciliIdariKayit.id : '',
    adi: seciliIdariKayit ? seciliIdariKayit.adi : '',
    veriDuzeyi: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.veriDuzeyi) : null,
    sorumluBirim: seciliIdariKayit ? seciliGrupBaskanligi() : null,
    yasalHukum: seciliIdariKayit ? seciliIdariKayit.yasal_hukum : '',
    protokol: '',
    sema: seciliIdariKayit ? seciliIdariKayit.sema : '',
    eposta: seciliIdariKayit ? seciliIdariKayit.epostaGruplari : '',
    verininTutulduguYer: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.verininTutulduguYer) : null,
    kisitlar: seciliIdariKayit ? seciliIdariKayit.kisitlar : '',
    kaynakKurum: seciliIdariKayit ? seciliKaynakKurum() : null,
    kaynakBirim: null,
    transferVerisininFormati: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.transferVerisininFormati) : null,
    transferSikligi: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.periyot) : null,
    veriIcerik: seciliIdariKayit ? seciliIdariKayit.icerik : '',
    veriBirimDuzeyi: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.birimDuzeyi) : '',
    cografiDuzeyi: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.cografiDuzey) : null,
    veriTalepBicimi: seciliIdariKayit ? seciliKayitItem(seciliIdariKayit.veriTalepBicimi) : null,
    tablolar:[
      {
        id:0,
        adi:"",
        aciklama:"",
        viewAdi:"",
        kolonBilgileri:[
          {
            id:0,
            adi: "",
            aciklama:"",
            viewAdi: "",
            pkKontrol:false,
            iliskiTabloKolonAdi:""
          }
        ]
      }
    ]
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  function reactQuillHandleChange (name, icerik, setFieldValue) {
    setFieldValue(name, icerik)
  }

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
          dirty
        }) => (
          <Form onSubmit={handleSubmit}>
            <ButonAlani>
              <ButonGrup>
                <Button fill intent={'danger'} minimal={!idariGenel} text={'İdari Kayıt Genel Bilgileri'}
                        onClick={genelIdariSayfaClick}/>
                <Button fill intent={'danger'} minimal={!idariTablo} text={'İdari Kayıt Tablo Bilgileri'}
                        onClick={tabloIdariSayfaClick}/>
              </ButonGrup>
              {dirty && (
                <IcerikTemizleButon minimal intent={'danger'} text={'İçeriği Temizle'} rightIcon="cross" onClick={resetForm}/>
              )}
            </ButonAlani>
            {idariGenel && (
              <Container fluid>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="İdari Kayıt Adı:">
                      <InputGroup large name="adi" value={values.adi} onChange={handleChange}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="İdari Kayıt Kodu:">
                      <InputGroup large name="kodu" value={values.kodu} onChange={handleChange}
                                  disabled={seciliIdariKayit}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Kaynak Kurum:">
                      <Field name='kaynakKurum' isClearable value={values.kaynakKurum}
                             options={kurumlarOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Kaynak Birim:">
                      <Field name='kaynakBirim' isClearable value={values.kaynakBirim || null}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Verinin Düzeyi:">
                      <Field name='veriDuzeyi' isClearable value={values.veriDuzeyi || null}
                             options={veriDuzeyiOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Transfer Verisinin Formatı:">
                      <Field name='transferVerisininFormati' isClearable
                             options={transferFormatiOption}
                             value={values.transferVerisininFormati || null}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Transferden Sorumlu Birim:">
                      <Field name='sorumluBirim' isClearable value={values.sorumluBirim || null}
                             options={birimOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Transfer Sıklığı:">
                      <Field name='transferSikligi' isClearable value={values.transferSikligi || null}
                             options={periyotOptions}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label='Yasal Hüküm:'>
                      <ReactQuill name='yasalHukum' value={values.yasalHukum || ''}
                                  onChange={(icerik) => reactQuillHandleChange('yasalHukum', icerik, setFieldValue)}/>
                      <Button style={{ float: 'right' }} intent={'primary'} text="Yasal Hükümleri Yükle"
                              rightIcon={'export'} onClick={() => handleClick(hiddenYasalHukumInput)}/>
                      <input type="file" name='yasalHukum' style={{ display: 'none' }} ref={hiddenYasalHukumInput}
                             accept=".pdf, .doc, .docx, .xls, .xlsx"
                             onChange={(event) => dosyaYukleme(event, 'yasalHukum', setFieldValue)}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label='Veri İçeriği:'>
                      <ReactQuill name='veriIcerik' value={values.veriIcerik || ''}
                                  onChange={(icerik) => reactQuillHandleChange('veriIcerik', icerik, setFieldValue)}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir/>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Protokol:">
                      <InputGroup value={values.protokol.name} disabled={values.protokol}/>
                      <Button style={{ float: 'right' }} intent={'primary'} text="Protokol Yükle"
                              rightIcon={'export'}
                              onClick={() => handleClick(hiddenProtokolInput)}/>
                      <input type="file" name='protokol' style={{ display: 'none' }} ref={hiddenProtokolInput}
                             accept=".pdf, .doc, .docx, .xls, .xlsx"
                             onChange={(event) => dosyaYukleme(event, 'protokol', setFieldValue)}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Şema:">
                      <InputGroup name="sema" value={values.sema || ''} onChange={handleChange}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="E-Posta Grup:">
                      <InputGroup type="email" name="eposta" value={values.eposta} onChange={handleChange}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Verinin Birim Düzeyi:">
                      <Field name='veriBirimDuzeyi' isClearable value={values.veriBirimDuzeyi || null}
                             options={veriBirimDuzeyiOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Verinin Tutulduğu Yer:">
                      <Field name='verininTutulduguYer' isClearable value={values.verininTutulduguYer || null}
                             options={veriTutulanYerOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Coğrafi Duzeyi:">
                      <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                             options={cografiDuzeyOptions}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <Satir>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Kısıtlar:">
                      <TextArea fill name='kisitlar' value={values.kisitlar || null} onChange={handleChange}/>
                    </FormGroup>
                  </Col>
                  <Col/>
                  <Col sm={5.5} md={5.5} lg={5.5}>
                    <FormGroup label="Veri Talep Biçimi:">
                      <Field name='veriTalepBicimi' isClearable value={values.veriTalepBicimi || null}
                             options={veriTalepBicimiOption}
                             component={SelectField}/>
                    </FormGroup>
                  </Col>
                </Satir>
                <FonksiyonelButonAlani>
                  <Col sm={8} md={8} lg={8}/>
                  <Col>
                    <Button fill intent='danger' text={'Geri Dön'} onClick={history.goBack}/>
                  </Col>
                  <Col>
                    <Button fill intent='success' text={'Kaydet'}/>
                  </Col>
                </FonksiyonelButonAlani>
              </Container>
            )}
            {idariTablo && (
              <IdariKayitTabloForm
                tablolar={values.tablolar}
                kolonBilgileri={values.tablolar.map(tablo => tablo.kolonBilgileri)}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
            )}
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}