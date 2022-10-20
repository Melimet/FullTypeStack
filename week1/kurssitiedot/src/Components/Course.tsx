function Header({ course }: {course: string }) {
  return <h1>{course}</h1>
}

type PartType = {
  name: string,
  exercises: number,
  id: number,
}

function Part({ name, exercises, id}: PartType) {
  return <p>{name}, exercises: {exercises}</p>
}

function Content({ parts }: {parts: PartType[]}){
  return (
    <div>
      {parts.map((part) => <Part key={part.name} name={part.name} exercises={part.exercises} id={part.id} />)}
    </div>
  )
}

function Total({ parts }: {parts: PartType[]}){
  return <p>
  Total exercises: {parts.reduce((sum, current) => sum + current.exercises, 0)}
  </p>
}

function Course({ course: { name, id, parts } }: { course: { name: string, id: number, parts: PartType[] } }) {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  ) 
}

export { Course }