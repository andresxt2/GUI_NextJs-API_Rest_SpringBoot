
import { ProductList } from '@/components/product-list'
import { Container } from '@/components/ui/container'

export const revalidate = 0

const HomePage = async () => {
  const products =  [
    {
      "productoId": 1,
      "nombre": "Semestre 2024-A",
      "precio": 3000,
      "img": "/images/semester.png"
    },
    {
      "productoId": 2,
      "nombre": "Semestre 2024-B",
      "precio": 3000,
      "img": "/images/semester.png"
    },
    {
      "productoId": 3,
      "nombre": "Semestre 2024-Verano-Idiomas",
      "precio": 300,
      "img": "/images/semester.png"
    },
    {
      "productoId": 4,
      "nombre": "Semestre 2024-Invierno-Idiomas",
      "precio": 300,
      "img": "/images/semester.png"
    }
  ]

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 py-6 px-4 sm:px-6 lg:px-8">
          <ProductList title="Semestres Disponibles" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage