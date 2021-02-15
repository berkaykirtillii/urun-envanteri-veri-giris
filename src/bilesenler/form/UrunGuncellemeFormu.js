import React from 'react'
import useUrunDetay from '../hook/useUrunDetay'
import UrunForm from './UrunForm'



export default function UrunGuncellemeFormu({match}){
  const seciliUrun = useUrunDetay(Number(match.params.id))
  console.debug('GuncelleForm', seciliUrun)

  if(!seciliUrun) return null

  return(
    <UrunForm
      seciliUrun={seciliUrun}
    />
  )


}