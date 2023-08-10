import './style/style.css'

export default function SmallCard(props) {
    const name = props.name;
  return (
    <div className='SmallCard'>
        {name}
    </div>
  )
}
