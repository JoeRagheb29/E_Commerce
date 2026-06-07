import './product.css'

function Slider({Imgs,styleImg}) {

  return (
      <div id="carouselExampleAutoplaying" className="carousel slide h-600" data-bs-ride="carousel">
        <div className="carousel-inner h-100">
          <div className="carousel-item w-100 active ">
            <h2 className='position-absolute mx-5 top-50c start-0 translate-middle-y z-3'>Let's show the fashion</h2>
            <img src={Imgs[0]} className={"d-block w-100 h-600 position-absolute "+styleImg} alt="img1" />
          </div>
          <div className="carousel-item w-100">
            <h2 className='position-absolute z-3'>ppppppppppppppppp</h2>
            <img src={Imgs[1]} className={"d-block w-100 h-600 position-absolute "+styleImg} alt="img2" />
          </div>
          <div className="carousel-item w-100">
            <h2 className='position-absolute z-3'>ppppppppppppppppp</h2>
            <img src={Imgs[2]} className={"d-block w-100 h-600 position-absolute "+styleImg} alt="img3" />
          </div>
        </div>
        <button
          className="carousel-control-prev" type="button"
          data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      </div>
  );
}

export default Slider;