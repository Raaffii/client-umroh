export default function TopBars() {
  return (
    <nav className='navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
      <div className='text-center navbar-brand-wrapper d-flex align-items-center justify-content-center'>
        <h1 className='logo-tulis'>UMROH</h1>
      </div>
      <div className='navbar-menu-wrapper d-flex align-items-center justify-content-end'>
        <button className='navbar-toggler navbar-toggler align-self-center' type='button' data-toggle='minimize'>
          <span className='icon-menu'></span>
        </button>

        <ul className='navbar-nav navbar-nav-right'>
          <li className='nav-item dropdown mr-4 d-lg-flex d-none'></li>
        </ul>
        <button className='navbar-toggler navbar-toggler-right d-lg-none align-self-center' type='button' data-toggle='offcanvas'>
          <span className='icon-menu'></span>
        </button>
      </div>
    </nav>
  );
}
