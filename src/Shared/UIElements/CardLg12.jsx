export default function CardLg12({ children, title, description }) {
  return (
    <div className='row'>
      <div className='col-lg-12 grid-margin stretch-card'>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>{title}</h4>
            <p className='card-description'>
              Data <code>{description}</code>
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
