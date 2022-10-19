function Header({ course }: {course: string }) {
  return <h1>{course}</h1>
}

type PartType = {
  name: string,
  exercises: number,
}


function Part({ name, exercises}: PartType) {
  return <p>{name}, exercises: {exercises}</p>
}

function Content({ parts }: {parts: PartType[]}){
  return <div>
  {parts.map((part) => <Part key={part.name} name={part.name} exercises={part.exercises}/>)}
  </div>
}


function Total({ parts }: {parts: PartType[]}){
  return <p>
  Total exercises: {parts.reduce((sum, current) => sum + current.exercises, 0)}
  </p>
}

function App() {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return <div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts}/>
  </div>
}

export default App;
