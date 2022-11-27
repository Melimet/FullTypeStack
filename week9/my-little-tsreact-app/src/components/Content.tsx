import { CoursePart } from '../types'
import { Part } from './Part'

function Content({ courses }: { courses: CoursePart[]}):JSX.Element{
  return (
    <ul>
      { courses.map((coursePart: CoursePart) => 
      <div key={coursePart.name}>
       <Part coursePart = {coursePart}/>
       </div>
       )}
    </ul>
  )
}

export { Content }