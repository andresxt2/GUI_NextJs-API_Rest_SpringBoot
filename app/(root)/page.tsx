import Image from "next/image";

export default function Home() {
  const articles = [
    {
      title: 'Innovación y Tradición en Educación Superior',
      content: '"Bullworth College se enorgullece de combinar lo mejor de la tradición académica con una vanguardista aproximación a la enseñanza y el aprendizaje. Situados en el corazón de Quito, ofrecemos un entorno diverso y dinámico donde los estudiantes pueden prosperar. Con programas que van desde las humanidades hasta la tecnología avanzada, cada curso está diseñado para desafiar, inspirar y preparar a los estudiantes para el éxito en un mundo globalizado. Únete a nosotros para una experiencia universitaria que dejará una huella duradera en tu vida personal y profesional."',
      flex_class: 'lg:flex-row',
      img_src: 'https://andrestayupanta.neocities.org/imagesMvc/bullworth.jpg'
    },
    {
      title: 'Nuestro Compromiso con la Excelencia',
      content: '"En Bullworth College, la excelencia no es solo una meta, es nuestro compromiso. Nuestra facultad de renombre internacional impulsa la investigación innovadora y una enseñanza que cambia vidas, enmarcada por un campus vibrante que alberga una amplia gama de actividades culturales, sociales y deportivas. Estamos dedicados a cultivar líderes y ciudadanos responsables, equipados para aportar a la sociedad y al bienestar global. Experimenta el poder de la educación en una institución que valora la curiosidad, el debate intelectual y la búsqueda incesante del conocimiento."',
      flex_class: 'lg:flex-row-reverse',
      img_src: 'https://andrestayupanta.neocities.org/imagesMvc/sites1.jpg'
    }
  ];

  return (
    <main className="container mx-auto mt-5 p-5">
      <section className="bg-white p-5 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Bullworth College</h2>
      </section>

      {articles.map((article, index) => (
        <div key={index} className={`flex flex-col ${article.flex_class} mb-10`}>
          <article className="w-full lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <p className="text-lg">{article.content}</p>
          </article>
          <article className="w-full lg:w-1/2 p-4">
            <img src={article.img_src} className="w-full h-auto rounded-lg shadow-md" alt="" />
          </article>
        </div>
      ))}
    </main>
  );
}
