export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white pt-4 pb-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-3">
              <img 
                src="https://andrestayupanta.neocities.org/imagesMvc/images.jpg" 
                alt="Bullworth College Logo" 
                className="mb-2"
              />
              <p>Comprometidos con la formación de líderes y profesionales que marcarán la diferencia en el mundo.</p>
            </div>
            <div className="w-full lg:w-1/3 mb-3">
              <h5 className="font-bold">Contáctanos</h5>
              <p>Av. 12 de Octubre y Roca, Quito, Ecuador</p> 
              <p>+593 2 123 4567</p>
              <p>secretaria@bullworth.edu.ec</p>
            </div>
            <div className="w-full lg:w-1/3">
              <h5 className="font-bold">Facultades</h5>
              <ul className="list-none">
                <li><a href="#" className="text-white hover:text-gray-300">Facultad de Ciencias</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Facultad de Derecho</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Facultad de Ingeniería</a></li>
                <li><a href="#" className="text-white hover:text-gray-300">Facultad de Artes</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }