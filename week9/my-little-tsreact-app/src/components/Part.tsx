import { CoursePart } from "../types"

function assertNever(value: never): never{
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

function Part({ coursePart }: {coursePart: CoursePart}){
  switch (coursePart.type){
    case 'normal':
      return (
        <li>
          <h3>{coursePart.name}, exercises {coursePart.exerciseCount}</h3>
          <i>{coursePart.description}</i>
        </li>
      )
    case 'groupProject':
      return (
        <li>
          <h3>{coursePart.name}, exercises {coursePart.exerciseCount}</h3>
          Project exercises: {coursePart.groupProjectCount}
        </li>
      )
    case 'submission':
      return (
        <li>
          <h3>{coursePart.name}, exercises {coursePart.exerciseCount}</h3>
          <i>{coursePart.description}</i><br></br>
          <a href={coursePart.exerciseSubmissionLink}>submission link</a>
        </li>
      )
    case 'special':
      return (
        <li>
          <h3>{coursePart.name}, exercises {coursePart.exerciseCount}</h3>
          <i>{coursePart.description}</i>
          <p>required skills: {coursePart.requirements.join(", ")}</p>

        </li>
      )
    default:
      assertNever(coursePart)
  }
}

export { Part }