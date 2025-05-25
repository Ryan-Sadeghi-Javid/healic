import { useState, useRef } from 'react'

import Image from './Image/Image'
import Title from '../Title/Title'
import Popup from '../Popup/Popup'
import './BreakingBarriers.css'

import AutismLarge from '../../assets/images/autism-large.jpg'
import AutismSmall from '../../assets/images/autism-small.jpg'
import DownSyndromeLarge from '../../assets/images/down-syndrome-large.jpg'
import DownSyndromeSmall from '../../assets/images/down-syndrome-small.jpg'
import DepressionLarge from '../../assets/images/depression-large.jpg'
import DepressionSmall from '../../assets/images/depression-small.jpg'

import RacismLarge from '../../assets/images/racism-large.jpg'
import RacismSmall from '../../assets/images/racism-small.jpg'
import SexismLarge from '../../assets/images/sexism-large.jpg'
import SexismSmall from '../../assets/images/sexism-small.jpg'
import AbleismLarge from '../../assets/images/ableism-large.jpg'
import AbleismSmall from '../../assets/images/ableism-small.jpg'

import ObesityLarge from '../../assets/images/obesity-large.jpg'
import ObesitySmall from '../../assets/images/obesity-small.jpg'
import AddictionLarge from '../../assets/images/addiction-large.jpg'
import AddictionSmall from '../../assets/images/addiction-small.jpg'
import HIVAIDSLarge from '../../assets/images/hiv-aids-large.jpg'
import HIVAIDSSmall from '../../assets/images/hiv-aids-small.jpg'

import PTSDLarge from '../../assets/images/ptsd-large.jpg'
import PTSDSmall from '../../assets/images/ptsd-small.jpg'
import AgeismLarge from '../../assets/images/ageism-large.jpg'
import AgeismSmall from '../../assets/images/ageism-small.jpg'
import STDLarge from '../../assets/images/stds-large.jpg'
import STDSmall from '../../assets/images/stds-small.jpg'

const imageArray = [
  {
    title: "Autism",
    largeImage: AutismLarge,
    smallImage: AutismSmall,
    link1: "https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd",
    link2: "https://twitter.com/AutismCanada",
    link3: "https://www.autismspeaks.ca/donate/"
  },
  {
    title: "Down Syndrome",
    largeImage: DownSyndromeLarge,
    smallImage: DownSyndromeSmall,
    link1: "https://www.ndss.org/about",
    link2: "https://twitter.com/PositiveaboutDS",
    link3: "https://give.ndss.org/give/59045/#!/donation/checkout"
  },
  {
    title: "Depression",
    largeImage: DepressionLarge,
    smallImage: DepressionSmall,
    link1: "https://www.nimh.nih.gov/health/topics/depression",
    link2: "https://twitter.com/FamilyAware",
    link3: "https://donate.adaa.org/give/322300#!/donation/checkout"
  },
  {
    title: "Racism",
    largeImage: RacismLarge,
    smallImage: RacismSmall,
    link1: "https://www.apa.org/topics/racism-bias-discrimination",
    link2: "https://twitter.com/AntiRacismDay",
    link3: "https://secure3.convio.net/blmca/site/Donation2?&df_id=1520&1520.donation=form1&mfc_pref=T&FR_ID=1060&PROXY_ID=1060&PROXY_TYPE=21"
  },
  {
    title: "Sexism",
    largeImage: SexismLarge,
    smallImage: SexismSmall,
    link1: "https://eige.europa.eu/publications/sexism-at-work-handbook/part-1-understand/what-sexism",
    link2: "https://twitter.com/equalitynow/",
    link3: "https://www.equalitynow.org/donate/"
  },
  {
    title: "Ableism",
    largeImage: AbleismLarge,
    smallImage: AbleismSmall,
    link1: "https://www.accessliving.org/newsroom/blog/ableism-101/",
    link2: "https://twitter.com/InclusionCA",
    link3: "https://www.accessliving.org/donate/"
  },
  {
    title: "Obesity",
    largeImage: ObesityLarge,
    smallImage: ObesitySmall,
    link1: "https://www.who.int/health-topics/obesity",
    link2: "https://twitter.com/obesitycan",
    link3: "https://obesitycanada.ca/donate/"
  },
  {
    title: "Addiction",
    largeImage: AddictionLarge,
    smallImage: AddictionSmall,
    link1: "https://www.healthline.com/health/addiction",
    link2: "https://twitter.com/actionaddiction",
    link3: "https://steps2recovery.org.uk/donate/"
  },
  {
    title: "HIV/AIDS",
    largeImage: HIVAIDSLarge,
    smallImage: HIVAIDSSmall,
    link1: "https://www.mayoclinic.org/diseases-conditions/hiv-aids/symptoms-causes/syc-20373524",
    link2: "https://twitter.com/unicef_aids",
    link3: "https://donate.eltonjohnaidsfoundation.org/"
  },
  {
    title: "PTSD",
    largeImage: PTSDLarge,
    smallImage: PTSDSmall,
    link1: "https://psychiatry.org/patients-families/ptsd/what-is-ptsd",
    link2: "https://twitter.com/WoundWarriorCA",
    link3: "https://woundedwarriors.ca/donate/"
  },
  {
    title: "Ageism",
    largeImage: AgeismLarge,
    smallImage: AgeismSmall,
    link1: "https://www.who.int/news-room/questions-and-answers/item/ageing-ageism",
    link2: "https://twitter.com/Age_Int",
    link3: "https://www.ageinternational.org.uk/donation/donate"
  },
  {
    title: "STDs",
    largeImage: STDLarge,
    smallImage: STDSmall,
    link1: "https://kidshealth.org/en/teens/std.html",
    link2: "https://twitter.com/CDCSTD",
    link3: "https://www.hasslefreeclinic.org/donate"
  }
];

export default function BreakingBarriers() {
  const [focusedImage, focusImage] = useState(null)
  const popup = useRef()

  const openImage = (image, link1, link2, link3) => {
    focusImage({ image, link1, link2, link3 })
    popup.current.show(true)
  }

  return (
    <div id='breaking-barriers' className='text-center'>
      <Popup ref={popup} outsideClick>
        <img className='blurred-image' src={focusedImage?.image ?? ''} alt="" width="500" height="375" />
        <div className='breaking-barriers-buttons'>
          <a href={focusedImage?.link1} target='_blank' rel="noreferrer" className='breaking-barriers-button waves-effect waves-light btn-large'>Learn More</a>
          <a href={focusedImage?.link2} target='_blank' rel="noreferrer" className='breaking-barriers-button waves-effect waves-light btn-large'>Social Media</a>
          <a href={focusedImage?.link3} target='_blank' rel="noreferrer" className='breaking-barriers-button-bottom waves-effect waves-light btn-large'>Donate to Help</a>
        </div>
      </Popup>
      <div className='container'>
        <Title title='Breaking Barriers'><b>Stigma</b> often comes from lack of understanding or fear. Inaccurate or misleading media representations of various illnesses contribute to both those factors. No single person or group of people are more likely than others to suffer from a disability or face a social, mental or physical issue.<br /><br />Stigma hurts everyone by creating <b>barriers</b> (more fear or anger toward ordinary people) instead of focusing on the disease that is causing the problem. Barriers can also make people more likely to hide symptoms or illness, keep them from seeking health care immediately, and prevent individuals from adopting healthy behaviors.<br /><br /><b>HOW TO (BREAK THE BARRIERS):</b>
          <ol>
            <li>Click on a topic that interests you.</li>
            <li>Click on the buttons in the popup to learn more about the social, mental and physical issues people face.</li>
            <li>Donate (OPTIONAL) to a charity that helps fight the barriers we put up against others.</li>
            <li>Do your own research!</li>
          </ol>
        </Title>
        <div className='row'>
          <div className='breaking-barriers-items'>
            {imageArray
              ? imageArray.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4' onClickCapture={() => openImage(d.largeImage, d.link1, d.link2, d.link3)}>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}