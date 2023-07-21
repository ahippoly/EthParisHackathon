import { Countries } from "@/types/user/meta-datas/countries";
import { Interests } from "@/types/user/meta-datas/interests";
import { Langs } from "@/types/user/meta-datas/langs";
import { Skills } from "@/types/user/meta-datas/skills";

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
  }
}