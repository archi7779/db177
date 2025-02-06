// import {helpers as fromHelpers} from '../helpers'
// fromHelpers.help()
import  SvgIcon from '@/accets/SVG.svg'
import ppnIcon from '@/accets/icon_x180.png'
 const About = () => {
    const testAbout = () => {
        console.log("CHECHE")
    }

     //TODO: нет разницы получается раз в бандле одинакого выглядит? ДА РАЗНИЦЫ НЕТ
    return <div>
        <div onClick={testAbout}></div>
        <div onClick={()=>{console.log("KAGO")}}></div>
        <img src={ppnIcon} />
       <SvgIcon fill={'green'} width={50} height={50}/>
    </div>
}
 export default About