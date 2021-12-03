export default function NavBar(props){
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.js">{props.titre}</a>
      </div>
    </nav>
  )
}