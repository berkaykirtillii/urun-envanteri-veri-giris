import React from 'react'
import { useRecoilValue } from 'recoil'
import { bultenlerState } from '../store'
import Liste from './Liste'


export default function BultenListe({match}) {
  const bultenler = useRecoilValue(bultenlerState)

  return(
    <Liste
      title={"Haber Bültenleri"}
      butonText={"Yeni Haber Bülteni Ekle"}
      dizi={bultenler}
      url={match.url}
      path={`${match.url}/yeni-bulten`}
    />
  )
}
