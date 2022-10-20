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

function App() {
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return <div>
    {courses.map((course) => <Course key={course.id} course={course} />)}
  </div>

}

export default App;
