import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'
import { exampleWallet1, exampleWallet2, exampleWallet3, exampleWallet4, exampleWallet5 } from '~~/mockups/ethers/wallet'

export const loggedUser: IUser = {
  _id: 'some-cismo-id',
  name: 'DarkSasukeu93',
  description: "J'espère devinir milliardaire en jouant au loto et en pariant mon salaire sur Mbape tous les mois",
  goals: ['Devenir riche', 'Soulever un max de belettes'],
  profile: {
    country: Countries.FRANCE,
    langs: [Langs.FRENCH, Langs.ENGLISH],
    interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
    skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
  },
  search: {
    minimumBalance: 10000,
    country: Countries.FRANCE,
    langs: [Langs.FRENCH, Langs.ENGLISH],
    interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
    skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
  },
  xmtpPublicAddress: '',
  xmtpCryptedPrivateKey: '',
  openOnlyToThoseMatchingSearch: true
}

export const relevantUsers: IUser[] = [
  {
    _id: 'some-cismo-id-1',
    name: 'ArcherBrutal',
    description: "Je peux pas, j'ai Destiny",
    goals: ['Finir 140 000 fois chaque raid de Destiny', 'et les finir encore'],
    profile: {
      country: Countries.FRANCE,
      langs: [Langs.CIRCASSIAN],
      interests: [Interests.INVESTING, Interests.GAMING],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    search: {
      minimumBalance: 10000,
      country: Countries.FRANCE,
      langs: [Langs.FRENCH, Langs.ENGLISH],
      interests: [Interests.ALGORAND],
      skills: [Skills.ADMINISTRATIVE_SUPPORT, Skills.BUSINESS_WRITING]
    },
    openOnlyToThoseMatchingSearch: true,
    xmtpPublicAddress: exampleWallet1.address
  },
  {
    _id: 'some-cismo-id-2',
    name: 'Kimimao',
    description: "C'est pas moi c'est la poele",
    goals: ['être le meilleur dresseur', 'relever tous les défis'],
    profile: {
      country: Countries.FRANCE,
      langs: [Langs.FRENCH],
      interests: [Interests.BITCOIN_AND_CRYPTOCURRENCY_TECHNOLOGIES],
      skills: [Skills.SOCIAL_MEDIA_CONTESTS_MANAGEMENT]
    },
    search: {
      minimumBalance: 10000,
      country: Countries.FRANCE,
      langs: [Langs.FRENCH, Langs.ENGLISH],
      interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    openOnlyToThoseMatchingSearch: true,
    xmtpPublicAddress: exampleWallet2.address
  },
  {
    _id: 'some-cismo-id-3',
    name: 'Wolfknight',
    description: 'être la plus belle',
    goals: ['arrêter de faire pleuvoir'],
    profile: {
      country: Countries.FRANCE,
      langs: [Langs.ENGLISH],
      interests: [Interests.CDAI],
      skills: [Skills.GRAPHIC_DESIGN, Skills.VIRTUAL_EVENTS_COORDINATION]
    },
    search: {
      minimumBalance: 10000,
      country: Countries.FRANCE,
      langs: [Langs.FRENCH, Langs.ENGLISH],
      interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    openOnlyToThoseMatchingSearch: true,
    xmtpPublicAddress: exampleWallet3.address
  },
  {
    _id: 'some-cismo-id-4',
    name: 'Skolak',
    description: 'tous les niquer sur rocket leage',
    goals: ['comprendre comment on avance'],
    profile: {
      country: Countries.FRANCE,
      langs: [Langs.FULA],
      interests: [Interests.WORLD_OF_WOMEN],
      skills: [Skills.PHOTOGRAPHY]
    },
    search: {
      minimumBalance: 10000,
      country: Countries.FRANCE,
      langs: [Langs.FRENCH, Langs.ENGLISH],
      interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    openOnlyToThoseMatchingSearch: true,
    xmtpPublicAddress: exampleWallet4.address
  },
  {
    _id: 'some-cismo-id-5',
    name: 'BobyC',
    description: 'Vous connaissez king of the hat',
    goals: ['turbo clutch le hackaton'],
    profile: {
      country: Countries.FRANCE,
      langs: [Langs.ABKHAZIAN],
      interests: [Interests.WRITING],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    search: {
      minimumBalance: 10000,
      country: Countries.FRANCE,
      langs: [Langs.FRENCH, Langs.ENGLISH],
      interests: [Interests.DAVE_RAMSEY, Interests.WEB_DEV, Interests.FULL_STACK_DEV],
      skills: [Skills.WEB_DEVELOPMENT, Skills.FRONT_END_DEVELOPMENT, Skills.FULL_STACK_DEVELOPMENT]
    },
    openOnlyToThoseMatchingSearch: true,
    xmtpPublicAddress: exampleWallet5.address
  }
]
