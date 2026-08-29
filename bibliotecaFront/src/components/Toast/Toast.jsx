import './toast.css'

const Toast = (props) => {
  return (
    <section id="toast" style={props.tipo == 'error' ? {backgroundColor: "#DC2626"} : {backgroundColor: "#16A34A"}}>
      <p>{props.message}</p>
    </section>
  )
}

export default Toast
