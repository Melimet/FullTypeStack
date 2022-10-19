function Header({ course }: {course: string }) {
  return <h1>{course}</h1>
  }
function Part({ name, exercises}: { name: string, exercises: number }) {
  return <p>{name}, exercises: {exercises}</p>
}

function App() {

  function Content(){
    return <div>
      <Part name={part1} exercises={exercises1}/>
      <Part name={part2} exercises={exercises2}/>
      <Part name={part3} exercises={exercises3}/>
    </div>
  }

  function Total(){
    return <p>
      Total exercises: {exercises1+exercises2+exercises3}
    </p>
  }

  const course = "Half Stack application development"
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

    return <div>
        <Header course={course} />
        <Content />
        <Total />
     </div>
}

export default App;
