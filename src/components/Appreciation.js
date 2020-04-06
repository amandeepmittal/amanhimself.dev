import React from 'react'
import styled from 'styled-components'

/**
 *  Import all image files
 */
import one from '../images/testimonials/1.png'
import two from '../images/testimonials/2.png'
import three from '../images/testimonials/3.png'
import four from '../images/testimonials/4.png'
import five from '../images/testimonials/5.png'
import six from '../images/testimonials/6.png'
import seven from '../images/testimonials/7.png'
import eight from '../images/testimonials/8.png'
import nine from '../images/testimonials/9.png'
import ten from '../images/testimonials/10.png'
import eleven from '../images/testimonials/11.png'
import twelve from '../images/testimonials/12.png'
import thirteen from '../images/testimonials/13.png'
import fourteen from '../images/testimonials/14.png'
import fifteen from '../images/testimonials/15.png'
import sixteen from '../images/testimonials/16.png'

const Wrapper = styled.div`
  text-align: center;
`

const Anchor = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
`

const Appreciation = () => {
  return (
    <Wrapper>
      <Anchor href="https://twitter.com/Baconbrix/status/1206662673502478336?ref_src=twsrc%5Etfw">
        <img src={fifteen} />
      </Anchor>
      <Anchor href="https://twitter.com/FavreLeandro/status/1222864109701648385?ref_src=twsrc%5Etfw">
        <img src={four} />
      </Anchor>
      <Anchor href="https://twitter.com/spences10/status/1222780520637116417?ref_src=twsrc%5Etfw">
        <img src={nine} />
      </Anchor>
      <Anchor href="https://twitter.com/QuimperEmanuel/status/1235551452266999808?ref_src=twsrc%5Etfw">
        <img src={two} />
      </Anchor>
      <Anchor href="https://twitter.com/haysstanford/status/1231109890275520512?ref_src=twsrc%5Etfw">
        <img src={five} />
      </Anchor>
      <Anchor href="https://twitter.com/whizzzoe/status/1179090483395514368?ref_src=twsrc%5Etfw">
        <img src={six} />
      </Anchor>
      <Anchor href="https://twitter.com/tfmoliveira/status/1192758294957428737?ref_src=twsrc%5Etfw">
        <img src={seven} />
      </Anchor>
      <Anchor href="https://twitter.com/artyorsh/status/1168107966056284161?ref_src=twsrc%5Etfw">
        <img src={eight} />
      </Anchor>
      <Anchor href="https://twitter.com/dev__adi/status/1240363591812796416?ref_src=twsrc%5Etfw">
        <img src={ten} />
      </Anchor>
      <Anchor href="https://twitter.com/iambhavesh93/status/1236522522226462720?ref_src=twsrc%5Etfw">
        <img src={eleven} />
      </Anchor>
      <Anchor href="https://twitter.com/kpoosee/status/1231696910597132288?ref_src=twsrc%5Etfw">
        <img src={twelve} />
      </Anchor>
      <Anchor href="https://twitter.com/TarasNovak/status/1230901024199671811?ref_src=twsrc%5Etfw">
        <img src={thirteen} />
      </Anchor>
      <Anchor href="https://twitter.com/WajahatShaw/status/1221683137908019200?ref_src=twsrc%5Etfw">
        <img src={fourteen} />
      </Anchor>
      <Anchor href="https://twitter.com/Jscrambler/status/1206580386517663744?ref_src=twsrc%5Etfw">
        <img src={sixteen} />
      </Anchor>
      <Anchor href="https://twitter.com/r4meau/status/1246823291127500800?ref_src=twsrc%5Etfw">
        <img src={one} />
      </Anchor>
      <Anchor href="https://twitter.com/ng_real_ninja/status/1242877351702089728?ref_src=twsrc%5Etfw">
        <img src={three} />
      </Anchor>
    </Wrapper>
  )
}

export default Appreciation
